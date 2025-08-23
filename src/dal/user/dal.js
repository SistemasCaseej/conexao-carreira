import {getUserInfoSession} from "@/services/userService";
import {verifySession} from "@/dal/session/dal";
import {cache} from "react";


export const getUser = cache(async () => {
    const session = await verifySession()

    if (!session) return null

    try {
        return await getUserInfoSession(session);
    } catch (error) {
        console.log('Failed to fetch user')
        return null
    }
})