import 'server-only'
import {jwtVerify, SignJWT} from 'jose'
import {cookies} from "next/headers";
import {CreateTableSession, deleteUserSession} from "@/repositories/auth/createTableSession";
import {getUserByUserId} from "@/services/userService";
import { Timestamp } from "firebase/firestore";


const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function decrypt(session) {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        console.log('Failed to verify session')
    }
}

export async function createSession(userId) {

    const { role } = await getUserByUserId(userId);

    const session = await new SignJWT({userId, role})
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(encodedKey)

    const cookieStore = await cookies()

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
    })

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const tableSession = await CreateTableSession(userId, expiresAt, role);

    return tableSession;
}

export async function deleteCookieSession(userId) {
    const cookieStore = await cookies()
    cookieStore.delete('session')

    await deleteUserSession(userId)
}