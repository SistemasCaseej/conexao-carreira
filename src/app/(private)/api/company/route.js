import {createCompanyService} from "@/services/companyService";
import {NextResponse} from "next/server";
import {createCompanySchema} from "@/dto/company/create-company.dto";

export async function POST(req){

    try {
        const body = await req.json();

        const result = createCompanySchema.safeParse(body);

        if(!result.success){
            const formattedErrors = result.error.format();
            return NextResponse.json(
                {
                    success: false,
                    message: "Dados inválidos",
                    errors: formattedErrors,
                },
                {status: 400}
            );
        }

        const companyDto = result.data;

        const companyId = await createCompanyService(
                companyDto.address,
                companyDto.businessSector,
                companyDto.city,
                companyDto.cnpj,
                companyDto.companySize,
                companyDto.legalName,
                companyDto.site,
                companyDto.tradeName,
                companyDto.users,
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
            console.error("Erro ao criar empresa:", err);

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