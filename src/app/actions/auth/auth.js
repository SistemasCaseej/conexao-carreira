'use server';

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { SigninFormSchema } from "@/app/lib/definitions";
import {createSession} from "@/app/actions/auth/session";

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

        return { success: true };

    } catch (error) {
        const errors = {};

        switch (error.code) {
            case "auth/user-not-found":
                errors.email = ["Usuário não encontrado"];
                break;
            case "auth/wrong-password":
                errors.password = ["Senha incorreta. Tente novamente."];
                break;
            case "auth/invalid-email":
                errors.email = ["E-mail inválido. Verifique o formato."];
                break;
            case "auth/too-many-requests":
                errors.email = ["Muitas tentativas. Tente novamente mais tarde."];
                break;
            default:
                errors.email = ["Erro inesperado. Tente novamente."];
                break;
        }

        return { success: false, errors };

    }
}

