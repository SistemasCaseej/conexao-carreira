import {getAllApprovedUsers} from "@/services/userService";
import {NextResponse} from "next/server";


/**
 * @swagger
 * /api/users/approved:
 *
 *   get:
 *     description: Returns the approved users
 *     responses:
 *       200:
 *         description: Hello World!
 */
export async function GET() {

    const users = await getAllApprovedUsers();

    // Retorna uma lista com os candidatos aprovados
     return NextResponse.json(users)
}
