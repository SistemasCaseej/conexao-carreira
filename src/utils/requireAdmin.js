import {verifySession} from "@/dal/session/dal";

export async function requireAdmin(allowedRoles = []) {

    const session = await verifySession();

    if (!session || !session.isAuth || !allowedRoles.includes(session.role)) {
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