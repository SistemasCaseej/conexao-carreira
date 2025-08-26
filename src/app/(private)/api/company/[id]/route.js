import {NextResponse} from "next/server";
import { getCompanyByIdService } from "@/services/companyService";
import {requireAdmin} from "@/utils/requireAdmin";


export async function GET(_request, {params}) {

    const { ok, session, response } = await requireAdmin(["Admin", "Employee"])

    if (!ok) return response


    const { id } = await params;

    if(!id){
        return NextResponse.json(
            { success: false, error: "No such document id" },
            {status: 400 },
        )
    }

    try{
        const company = await getCompanyByIdService(id);

        return NextResponse.json(
            { success: true, message: "Company found" , data: { company } },
            { status: 200 },

        );
    }catch (error){
        console.error("Failed find document:", error);

        return NextResponse.json(
            { success: false, error: "Company not found" },
            { status: 500 }
        );
    }

}