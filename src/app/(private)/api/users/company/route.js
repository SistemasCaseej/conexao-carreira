import {createPendingUserSchema} from "@/dto/users/userDto";
import {NextResponse} from "next/server";
import {cpfAlreadyExists, createUserCompany, getUsersWithCompany, hasExistingEmail} from "@/services/userService";
import {cpf} from "cpf-cnpj-validator";


export async function GET(){
    const usersWithCompany = await getUsersWithCompany();

    return NextResponse.json(usersWithCompany)
}

export async function POST(req) {
    try {
        const body = await req.json();

        const validation = createPendingUserSchema.safeParse(body);

        if (!validation.success) {
            const formattedErrors = validation.error.format();
            return NextResponse.json(
                {
                    success: false,
                    message: "Dados inválidos",
                    errors: formattedErrors,
                },
                {status: 400}
            );
        }

        const isCpfTaken = await cpfAlreadyExists(body.cpf);
        const isEmailTaken = await hasExistingEmail(body.email);

        if (isEmailTaken || isCpfTaken) {
            const message = isEmailTaken
                ? "E-mail já está em uso"
                : "CPF já está em uso";

            return NextResponse.json(
                {
                    success: false,
                    message,
                },
                { status: 409 }
            );
        }


        const userDto = validation.data;

        const formatCpf = cpf.format(userDto.cpf);

        const userId = await createUserCompany(
            userDto.name,
            userDto.email,
            formatCpf,
            userDto.phoneNumber,
            userDto.linkedIn,
            userDto.city,
            body.company

        );

        return NextResponse.json(
            {
                success: true,
                message: `Usuário da Empresa foi criado com sucesso`,
                data: {userId},
            },
            {status: 201}
        );
    } catch (error) {
        console.error("Erro ao criar conta:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Erro interno ao criar conta",
                error: error?.message || "Erro desconhecido",
            },
            {status: 500}
        );
    }
}