import {addDoc, collection} from "firebase/firestore";
import {db} from "@/firebase/config";

export async function CreateTableSession(userId, expiresAt) {

    try{
        const sessionUsersRef = collection(db, "sessions");

        const docRef = await addDoc(sessionUsersRef, {
            userId,
            expiresAt
        })

        return docRef.id;
    }catch(error){
        console.error("Erro ao criar a sessão do usuário", error);
        throw new Error("Falha ao criar sessão do usuário");
    }
}