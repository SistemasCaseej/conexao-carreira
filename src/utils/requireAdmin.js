import {verifySession} from "@/dal/session/dal";

export async function requireAdmin(){

    const session = await verifySession();

    if (!session || !session.isAuth || session.role !== "Admin") {
        return {
            ok: false,
            response: new Response(null, { status: 401 }),
        }
    }

    return {
        ok: true,
        session,
    }

}