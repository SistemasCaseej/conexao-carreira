import 'server-only'

import { cookies } from 'next/headers'
import { decrypt } from "@/app/actions/auth/session";
import { cache } from "react";

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value

    if (!cookie) {
        return { isAuth: false, userId: null, role: null };
    }

    const session = await decrypt(cookie)

    if (!session?.userId && !session.role) {
        return { isAuth: false, userId: null, role: null };
    }

    return { isAuth: true, userId: session.userId, role: session.role}
})