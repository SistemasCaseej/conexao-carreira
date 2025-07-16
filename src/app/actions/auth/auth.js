"use server";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { redirect } from "next/navigation";
import { SigninFormSchema } from "@/app/lib/definitions";

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

        console.log(user);
        redirect("/dashboard");
    } catch (error) {
        let errorMessage = "Erro ao fazer login. Tente novamente.";

        if (error.code === "auth/user-not-found") {
            errorMessage = "Usuário não encontrado.";
        } else if (error.code === "auth/wrong-password") {
            errorMessage = "Senha incorreta.";
        } else if (error.code === "auth/invalid-email") {
            errorMessage = "E-mail inválido.";
        }

        return {
            errors: {
                email: [errorMessage],
            },
        };
    }
}
