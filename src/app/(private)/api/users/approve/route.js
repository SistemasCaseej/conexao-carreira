import { NextResponse } from "next/server";
import { approveUserById } from "@/services/userService";
import {requireAdmin} from "@/utils/requireAdmin";


export async function POST(_request){

    const { ok, session, response } = await requireAdmin(["Admin"])

    if (!ok) return response

    const body = await _request.json();
    const { userId, email } = body;

    if (!userId) {
        return NextResponse.json(
            { success: false, error: "ID document is required." },
            { status: 400 }
        );
    }

    try {
        await approveUserById(userId, email);

        return NextResponse.json(
            { success: true, message: `User ${email} approved successfully.`},
            { status: 200 }
        );

    }catch (error){
        console.error("Failed to approved user:", error);

        return NextResponse.json(
            { success: false, error: "User não encontrado." },
            { status: 500 }
        );
    }
}