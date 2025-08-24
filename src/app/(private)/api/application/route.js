import {NextResponse} from "next/server";
import {createApplicationService, getAllApplicationsService} from "@/services/applicationService";
import {verifySession} from "@/dal/session/dal";
import {requireAdmin} from "@/utils/requireAdmin";


export async function GET(){

    const { ok, session, response } = await requireAdmin()

    if (!ok) return response

    const allApplications = await getAllApplicationsService();

    return NextResponse.json(allApplications, { status: 200 });
}

export async function POST(req) {

    const { ok, session, response } = await requireAdmin()

    if (!ok) return response

    try{
        const body = await req.json();

        const applicationId = await createApplicationService({
            userId: body.userId,
            jobId: body.jobId,
            resume: body.resume
        });

        return NextResponse.json(
            {
                success: true,
                message: "Candidatura realizado com sucesso!",
                data: {applicationId},
            },
            {status: 201}
        );
    }catch (err){
        console.error("Erro ao candidatar-se a uma vaga", err);

        return NextResponse.json(
            {
                success: false,
                message: "Erro interno no servidor. Tente novamente mais tarde.",
                error: err instanceof Error ? err.message : String(err),
            },
            { status: 500 }
        );
    }
}