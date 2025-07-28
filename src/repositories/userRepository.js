//O repositório contém funções que interagem diretamente com o banco de dados.

import {addDoc, collection, getDocs, where, query} from "firebase/firestore";
import {db} from "@/firebase/config"

export async function getAllPendingUsers() {

    const usersRef = collection(db, "users");

    const q = query(usersRef, where ("status", "==", "Pendente"));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({

        id: doc.id,
        ...doc.data(),
    }));
}

export async function getAllApprovedUsers() {

    const usersRef = collection(db, "users");

    const q = query(usersRef, where ("status", "==", "Aprovado"));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
}


export async function createPendingUser(name, email, cpf, phoneNumber, linkedIn, city) {

    try {
        const pendingUsersRef = collection(db, "users");

        const docRef = await addDoc(pendingUsersRef, {
            name,
            email,
            cpf,
            phoneNumber,
            linkedIn,
            city,
            status : "Pendente",
            role : "Estudante"
        })

        return docRef.id
    }catch (error) {
        console.error("Erro ao criar usuário", error);
        throw new Error("Falha ao criar possível usuário");
    }
}

export async function getUserInfoSession(session) {
    const userRef = collection(db, "users");
    const queryUser = query(userRef, where ("userId", "==", session.userId));

    const querySnapshot = await getDocs(queryUser);

    if(querySnapshot.empty){
        return null;
    }

    const userDoc = querySnapshot.docs[0];

    return {
        userId: userDoc.id,
        ...userDoc.data()
    }
}

export async function hasExistingEmail(email) {

    try{
        const userRef = collection(db, "users");

        const queryUser = query(userRef, where ("email", "==", email));

        const querySnapshot = await getDocs(queryUser);

        return !querySnapshot.empty;


    }catch (error) {
        console.error("❌ Erro ao buscar email do usuário:", error);

        throw new Error("Erro ao buscar usuário no Firestore.");
    }
}

export async function cpfAlreadyExists(cpf){

    try {
        const userRef = collection(db, "users");

        const queryUser = query(userRef, where ("cpf", "==", cpf));

        const querySnapshot = await getDocs(queryUser);

        return !querySnapshot.empty;

    }catch (error) {
        console.error("Erro ao buscar CPF do usuário:", error);

        throw new Error("Erro ao buscar usuário no Firestore.");
    }
}