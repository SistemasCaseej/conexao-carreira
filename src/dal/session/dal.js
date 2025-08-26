import 'server-only'

import { cookies } from 'next/headers'
import { cache } from "react";
import {jwtVerify} from "jose";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value

    if (!cookie) {
        return {isAuth: false, userId: null, role: null};
    }

    try {
        const {payload} = await jwtVerify(cookie, secret);

        if (!payload?.userId || !payload?.role) {
            return {isAuth: false, userId: null, role: null};
        }

        return {isAuth: true, userId: payload.userId, role: payload.role};
    } catch (err) {
        return {isAuth: false, userId: null, role: null, error: err.message};
    }
})