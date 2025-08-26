import { getAllApprovedUsers} from "@/services/userService";
import { NextResponse} from "next/server";
import {requireAdmin} from "@/utils/requireAdmin";


export async function GET() {

    const { ok, response } = await requireAdmin(["Admin"])

    if (!ok) return response

    const users = await getAllApprovedUsers();

     return NextResponse.json(users)
}

