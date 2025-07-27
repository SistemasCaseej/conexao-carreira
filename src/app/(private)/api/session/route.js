import { getUser } from "@/dal/user/dal";
import { NextResponse } from "next/server";
import { deleteCookieSession } from "@/app/actions/auth/session";


/**
 * @swagger
 * /api_users.test.jsx/session:
 *   get:
 *     description: Pega o usuário autenticado é necessário informar um cookie
 *     responses:
 *       200:
 *         description: Hello World!
 */
export async function GET() {
    const userInfo = await getUser();

    return NextResponse.json(userInfo);
}


/**
 * @swagger
 * /api_users.test.jsx/session:
 *   get:
 *     tags:
 *       - Session
 *     summary: Obter o usuário autenticado
 *     description: Retorna um objeto contendo as propriedades userId e expiresAt
 *     responses:
 *       200:
 *         description: A JSON array of approved users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "12345"
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     example: "john.doe@example.com"
 *                   approved:
 *                     type: boolean
 *                     example: true
 *       401:
 *         description: Unauthorized - Authentication required
 *       500:
 *         description: Internal server error
 */
export async function DELETE() {
    const userInfo = await getUser();

    await deleteCookieSession(userInfo.userId);

    return  NextResponse.json({ message: "Log out realizado com sucesso" }, { status: 200 })
}