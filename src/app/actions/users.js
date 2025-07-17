'use server'

import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db} from "@/firebase/config"
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import {generateSecurePassword} from "@/utils/generatePassword";


export async function approveUser(userId, email) {
    try {

        const temporaryPassword = generateSecurePassword();

        const userCredential = await createUserWithEmailAndPassword(auth, email, temporaryPassword);

        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
            status: "Aprovado",
            approvedAt : new Date().toISOString(),
        })

       await sendPasswordResetEmail(auth, email);

        const user = userCredential.user;

        console.log('Usuário criado com sucesso:', user);
    }catch (error) {
        console.error('Erro ao criar usuário:', error.code, error.message);

        throw error;
    }
}

export async function rejectUser(userId) {
    try{
        const docRef = doc(db, "users", userId);
        await deleteDoc(docRef);
    }catch (error) {
        console.error("Erro ao excluir documento:", error);
    }
}