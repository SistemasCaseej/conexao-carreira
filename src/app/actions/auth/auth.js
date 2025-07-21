'use server';

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { SigninFormSchema } from "@/app/lib/definitions";
import {createSession} from "@/app/actions/auth/session";
import { redirect } from 'next/navigation'

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

    } catch (error) {
        const defaultMessage = "Ocorreu um erro. Tente novamente.";
        const errorMessage =
            error?.message || error?.response?.data?.message || defaultMessage;

        return {
            errors: {
                email: [errorMessage],
            },
        };
    }finally {
        redirect("http://localhost:3000/dashboard");
    }
}
