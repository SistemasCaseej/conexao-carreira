import { getAllApprovedUsers} from "@/services/userService";
import { NextResponse} from "next/server";
import {requireAdmin} from "@/utils/requireAdmin";


export async function GET() {

    const { ok, session, response } = await requireAdmin()

    if (!ok) return response

    const users = await getAllApprovedUsers();

     return NextResponse.json(users)
}

