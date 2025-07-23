import 'server-only'

import { cookies } from 'next/headers'
import { decrypt } from "@/app/actions/auth/session";
import { cache } from "react";

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    if (!cookie) {
        return { isAuth: false, userId: null };
    }

    // if (!session?.userId) {
    //     redirect('/candidate-login')
    // }

    return { isAuth: true, userId: session.userId }
})