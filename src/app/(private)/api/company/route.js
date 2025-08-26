import {createCompanyService, getAllCompaniesService, updateCompanyService} from "@/services/companyService";
import {NextResponse} from "next/server";
import {createCompanySchema} from "@/dto/company/create-company.dto";
import {requireAdmin} from "@/utils/requireAdmin";


export async function GET() {

    const { ok, session, response } = await requireAdmin(["Admin"])

    if (!ok) return response

    const allCompanies = await getAllCompaniesService();

    return NextResponse.json(allCompanies, { status: 200 });
}

export async function POST(req){

    const { ok, session, response } = await requireAdmin(["Admin"])

    if (!ok) return response

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
                message: "Empresa criada com sucesso!",
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


export async function PUT(req) {

    const { ok, session, response } = await requireAdmin(["Admin"])

    if (!ok) return response

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

        const companyId = await updateCompanyService(
            body.id,
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
                message: "Empresa atualizada com sucesso!",
                data: {companyId},
            },
            {status: 200}
        );
    }catch (erro){
        console.error("Erro ao atualizar empresa:", erro);

        return NextResponse.json(
            {
                success: false,
                message: "Erro interno no servidor. Tente novamente mais tarde.",
                error: erro instanceof Error ? erro.message : String(erro),
            },
            { status: 500 }
        );
    }
}