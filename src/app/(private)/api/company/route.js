import {createCompanyService} from "@/services/companyService";
import {NextResponse} from "next/server";

export async function POST(req){

    try {
        const body = await req.json();

        const companyId = await createCompanyService(
                body.address,
                body.area,
                body.city,
                body.cnpj,
                body.description,
                body.email,
                body.logoUrl,
                body.name,
                body.phone,
                body.site,
            );

        return NextResponse.json(
            {
                success: true,
                message: "Empresa Criada com sucesso!",
                data: {companyId},
            },
            {status: 201}
        );
    }catch(err){

    }
}