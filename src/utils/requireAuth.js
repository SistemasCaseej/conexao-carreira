import {verifySession} from "@/dal/session/dal";
import {redirect} from "next/navigation";


export async function requireAuth(allowedRoles, fallbackRedirect = "/dashboard") {

    const session = await verifySession()

    if (!session.isAuth) {
        redirect("/candidate-login")
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(session.role)) {
        redirect(fallbackRedirect)
    }

    return session

}