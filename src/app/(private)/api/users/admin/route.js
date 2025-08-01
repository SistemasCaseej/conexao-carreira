import { createPendingUserSchema } from "@/dto/users/userDto";
import { NextResponse } from "next/server";
import { cpfAlreadyExists, createAdminUser, getAllAdminUsers, hasExistingEmail } from "@/services/userService";
import { cpf as cpfValidator} from "cpf-cnpj-validator";


export async function GET() {
    const adminUsers = await getAllAdminUsers();

    return NextResponse.json(adminUsers)
}

export async function POST(req){

    try{
        const body = await req.json();

        const { name, email, cpf, phoneNumber, linkedIn, city } = body;

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


        const isCpfTaken = await cpfAlreadyExists(cpf);
        const isEmailTaken = await hasExistingEmail(email);

        if (isEmailTaken || isCpfTaken) {
            const message = isEmailTaken ? "E-mail já está em uso" : "CPF já está em uso";

            return NextResponse.json(
                { success: false, message},
                { status: 409 }
            );
        }

        const userDto = validation.data;

        const formatCpf = cpfValidator.format(userDto.cpf);

        const userId = await createAdminUser(userDto.name, userDto.email, formatCpf, userDto.phoneNumber, userDto.linkedIn, userDto.city)

        return NextResponse.json(
            {
                success: true,
                message: "Conta de Administrador criada com sucesso",
                data: { userId }
            },
            {status: 201}
        );
    }catch (error){
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