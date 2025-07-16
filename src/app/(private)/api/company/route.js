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
                companyDto.area,
                companyDto.city,
                companyDto.cnpj,
                companyDto.description,
                companyDto.email,
                companyDto.logoUrl,
                companyDto.name,
                companyDto.phone,
                companyDto.site,
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