//O repositório contém funções que interagem diretamente com o banco de dados.

import {addDoc, collection, getDocs} from "firebase/firestore";
import {db} from "@/firebase/config"

export async function getAllPendingUsers() {

    const querySnapshot = await getDocs(collection (db, "pending_users"));

    return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const {password, confirmPassword, ...filteredData} = data;
        return {
            id: doc.id,
            ...filteredData
        };
    });
}

export async function createUser(name, email, cpf, phoneNumber, linkedIn, city , password, confirmPassword) {

    try {
        const pendingUsersRef = collection(db, "pending_users");

        const docRef = await addDoc(pendingUsersRef, {
            name,
            email,
            cpf,
            phoneNumber,
            linkedIn,
            city,
            password,
            confirmPassword
        })

        return docRef.id
    }catch (error) {
        console.error("Erro ao criar usuário", error);
        throw new Error("Falha ao criar possível usuário");
    }
}

