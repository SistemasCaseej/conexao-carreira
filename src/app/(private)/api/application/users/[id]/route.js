import {NextResponse} from "next/server";
import { getCompanyByIdService } from "@/services/companyService";
import {getApplicationByUserService} from "@/services/applicationService";
import {requireAdmin} from "@/utils/requireAdmin";


export async function GET(_request, {params}) {

    const { ok, session, response } = await requireAdmin()

    if (!ok) return response

    const { id } = await params;

    if(!id){
        return NextResponse.json(
            { success: false, error: "No such document id" },
            {status: 400 },
        )
    }

    try{
        const application = await getApplicationByUserService(id);

        return NextResponse.json(
            { success: true, message: "Application found" , data: { application } },
            { status: 200 },

        );
    }catch (error){
        console.error("Failed find document:", error);

        return NextResponse.json(
            { success: false, error: "Application not found" },
            { status: 500 }
        );
    }

}