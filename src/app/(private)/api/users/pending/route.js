//O controlador(Controller) é a parte do sistema que recebe as entradas do usuário (geralmente ações ou comandos)

import { NextResponse } from 'next/server'
import {createUser, getAllPendingUsers} from "@/services/userService";
import {createUserSchema} from "@/dto/users/userDto";


/**
 * @swagger
 * /api/users/pending:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtém uma lista de usuários pendentes
 *     description: Retorna um array de usuários que estão pendentes no sistema.
 *     responses:
 *       200:
 *         description: Um array JSON contendo os usuários pendentes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "FNCMag7lkdF6ewjmxq"
 *                   name:
 *                     type: string
 *                     example: "José Silva"
 *                   email:
 *                     type: string
 *                     example: "jose@gmail.com"
 *                   status:
 *                     type: string
 *                     example: "Pendente"
 *       401:
 *         description: Unauthorized - Authentication required
 *       500:
 *         description: Internal server error
 */
export async function GET() {

    const users = await getAllPendingUsers();

    return NextResponse.json(users)
}


/**
 * @swagger
 * /api/users/pending:
 *   post:
 *     tags:
 *       - Users
 *     summary: Cria um novo usuário com status de pendente
 *     description: Cria uma conta de usuário com os dados fornecidos no corpo da requisição.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - cpf
 *               - phoneNumber
 *               - linkedIn
 *               - city
 *               - password
 *               - confirmPassword
 *             properties:
 *               name:
 *                 type: string
 *                 example: "José Silva"
 *               email:
 *                 type: string
 *                 example: "jose@gmail.com"
 *               cpf:
 *                 type: string
 *                 example: "123.456.789-00"
 *               phoneNumber:
 *                 type: string
 *                 example: "(85) 91234-5678"
 *               linkedIn:
 *                 type: string
 *                 example: "https://linkedin.com/in/josesilva"
 *               city:
 *                 type: string
 *                 example: "Fortaleza"
 *     responses:
 *       201:
 *         description: Conta criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Conta criada com sucesso
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "FNCMag7lkdF6ewjmxq"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Dados inválidos
 *                 errors:
 *                   type: object
 *       500:
 *         description: Erro interno ao criar conta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Erro interno ao criar conta
 *                 error:
 *                   type: string
 *                   example: Erro desconhecido
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