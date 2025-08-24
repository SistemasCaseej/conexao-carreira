import { getUser } from "@/dal/user/dal";
import { NextResponse } from "next/server";
import { deleteCookieSession } from "@/app/actions/auth/session";
import {requireAdmin} from "@/utils/requireAdmin";

export async function GET() {
    const { ok, session, response } = await requireAdmin()

    if (!ok) return response

    const userInfo = await getUser();

    return NextResponse.json(userInfo);
}

export async function DELETE() {

    const { ok, session, response } = await requireAdmin()

    if (!ok) return response

    const userInfo = await getUser();

    await deleteCookieSession(userInfo.userId);

    return  NextResponse.json({ message: "Log out realizado com sucesso" }, { status: 200 })
}