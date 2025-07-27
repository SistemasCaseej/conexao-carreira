import {getAllApprovedUsers} from "@/services/userService";
import {NextResponse} from "next/server";


/**
 * @swagger
 * /api_users.test.jsx/users/approved:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtém uma lista de usuários aprovados
 *     description: Retorna um array de usuários que foram aprovados no sistema.
 *     responses:
 *       200:
 *         description: Um array JSON contendo os usuários aprovados.
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
 *                   role:
 *                      type: string
 *                      example: "Estudante"
 *                   status:
 *                     type: string
 *                     example: "Aprovado"
 *       401:
 *         description: Unauthorized - Authentication required
 *       500:
 *         description: Internal server error
 */
export async function GET() {

    const users = await getAllApprovedUsers();

    // Retorna uma lista com os candidatos aprovados
     return NextResponse.json(users)
}
