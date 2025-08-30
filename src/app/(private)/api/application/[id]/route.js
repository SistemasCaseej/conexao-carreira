import {updateApplicationService} from "@/services/applicationService.js";
import {NextResponse} from "next/server";

export async function PATCH(req, {params}) {

    try {
        const {id} = params;

        const { resume } = await req.json();

        if (!resume) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Não existe currículo anexado",
                },
                {status: 400}
            );
        }

        const applicationId = await updateApplicationService(id, resume);

        return NextResponse.json(
            {
                success: true,
                message: "Candidatura realizado com sucesso!",
                data: {applicationId},
            },
            {status: 201}
        );
    }catch (error) {
        console.error(error);

    }
}