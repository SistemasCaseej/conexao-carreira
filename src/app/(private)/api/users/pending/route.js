//O controlador(Controller) é a parte do sistema que recebe as entradas do usuário (geralmente ações ou comandos)

import { NextResponse } from 'next/server'
import {cpfAlreadyExists, createPendingUser, getAllPendingUsers, hasExistingEmail} from "@/services/userService";
import {createPendingUserSchema} from "@/dto/users/userDto";
import {cpf} from "cpf-cnpj-validator";
import {requireAdmin} from "@/utils/requireAdmin";


export async function GET() {

    const { ok, session, response } = await requireAdmin()

    if (!ok) return response

    const users = await getAllPendingUsers();

    return NextResponse.json(users)
}

export async function POST(req) {

    const { ok, session, response } = await requireAdmin()

    if (!ok) return response

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

        const userId = await createPendingUser(
            userDto.name,
            userDto.email,
            formatCpf,
            userDto.phoneNumber,
            userDto.linkedIn,
            userDto.city,
        );

        return NextResponse.json(
            {
                success: true,
                message: "Conta criada com sucesso",
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