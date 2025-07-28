import {getAllApprovedUsers} from "@/services/userService";
import {NextResponse} from "next/server";


export async function GET() {

    const users = await getAllApprovedUsers();

    // Retorna uma lista com os candidatos aprovados
     return NextResponse.json(users)
}
