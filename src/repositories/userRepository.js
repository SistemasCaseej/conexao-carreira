//O repositório contém funções que interagem diretamente com o banco de dados.

//Devemos conectar ao banco de dados aqui futuramente - FireBase

//Exemplo
import {addDoc, collection} from "firebase/firestore";
import { db } from "@/firebase/config"

export async function getAll() {
    //Aqui deverá conter a lógica para recuperar todos os usuário do firebase

    // Devemos tirar isso depois
    return ["Bruno", "Rafael", "Maria", "Nathan", "Vinnicius", "Victor"];
}

export async function createUser(email, password) {

    try {
        const pendingUsersRef = collection(db, "pending_users");

        const docRef = await addDoc(pendingUsersRef, {
            email,
            password
        })

        return docRef.id
    }catch (error) {
        console.error("Erro ao criar usuário", error);
        throw new Error("Falha ao criar possível usuário");
    }
}

