import { getUser } from "@/dal/user/dal";
import { NextResponse } from "next/server";
import { deleteCookieSession } from "@/app/actions/auth/session";


/**
 * @swagger
 * /api/session:
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
 * /api/session:
 *   delete:
 *     description: Faz logout
 *     responses:
 *       200:
 *         description: Hello World!
 */
export async function DELETE() {
    const userInfo = await getUser();

    await deleteCookieSession(userInfo.userId);

    return  NextResponse.json({ message: "Log out realizado com sucesso" }, { status: 200 })
}