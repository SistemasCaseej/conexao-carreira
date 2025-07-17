'use server';

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { SigninFormSchema } from "@/app/lib/definitions";
import {createSession} from "@/app/lib/session";

export async function signin(state, formData) {
    const validatedFields = SigninFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { email, password } = validatedFields.data;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await createSession(user.uid);

        return {
            success: true,
            userId: user.uid
        }

    } catch (error) {
        let errorMessage = "Erro ao fazer login. Tente novamente.";

        return {
            errors: {
                email: [errorMessage],
            },
        };
    }
}
