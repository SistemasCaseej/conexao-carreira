'use server'

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config"

export async function approveUser(formData) {
    const email = formData.get("email")
    const password = formData.get("password");

    try {

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log('Usuário criado com sucesso:', user);
    }catch (error) {
        console.error('Erro ao criar usuário:', error.code, error.message);

        throw error;
    }
}