import { CreateTableSession } from "@/repositories/auth/createTableSession";
import { SignJWT } from "jose";
import { cookies } from "next/headers"


const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createSession(userId){
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const sessionId = await CreateTableSession(userId, expiresAt);

    const jwt = await new SignJWT({sessionId})
        .setProtectedHeader({ algorithm: "HS256" })
        .setIssuedAt()
        .setExpirationTime(expiresAt)
        .sign(secret)

    const cookieStore = await cookies();
    cookieStore.set("session", jwt, {
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'lax',
        expires: expiresAt,
    })
}