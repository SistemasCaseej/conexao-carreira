import {getAllApprovedUsers} from "@/services/userService";
import {NextResponse} from "next/server";

export async function GET() {

    const users = await getAllApprovedUsers();

    // Retorna a lista de usuários no formato JSON
    return NextResponse.json(users)
}