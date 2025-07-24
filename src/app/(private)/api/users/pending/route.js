//O controlador(Controller) é a parte do sistema que recebe as entradas do usuário (geralmente ações ou comandos)

import { NextResponse } from 'next/server'
import {createUser, getAllPendingUsers} from "@/services/userService";
import {createUserSchema} from "@/dto/users/userDto";


/**
 * @swagger
 * /api/users/pending:
 *   get:
 *     description: Returns All the users pending
 *     responses:
 *       200:
 *         description: Hello World!
 */
export async function GET() {

    const users = await getAllPendingUsers();

    return NextResponse.json(users)
}


/**
 * @swagger
 * /api/users/pending:
 *   post:
 *     description: Create a new user pending
 *     responses:
 *       200:
 *         description: Hello World!
 */
export async function POST(req) {
    try {
        const body = await req.json();

        const validation = createUserSchema.safeParse(body);

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

        const userDto = validation.data;

        const userId = await createUser(
            userDto.name,
            userDto.email,
            userDto.cpf,
            userDto.phoneNumber,
            userDto.linkedIn,
            userDto.city,
            userDto.password,
            userDto.confirmPassword,
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