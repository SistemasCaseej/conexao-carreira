//O controlador(Controller) é a parte do sistema que recebe as entradas do usuário (geralmente ações ou comandos)

import { NextResponse } from 'next/server'
import {createUser, createUserSchema, getAllPendingUsers} from "@/services/userService";


// Rota GET para listar todos os usuários
export async function GET() {

    const users = await getAllPendingUsers();

    // Retorna a lista de usuários no formato JSON
    return NextResponse.json(users)
}

export async function POST(req) {
    try {
        const body = await req.json();
        const {name, email, cpf, phoneNumber, linkedIn, city, password, confirmPassword} = body;

        const validation = createUserSchema.safeParse({name, email, cpf, phoneNumber, linkedIn, city, password, confirmPassword});

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

        const userId = await createUser(name, email, cpf, phoneNumber, linkedIn, city, password, confirmPassword);

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