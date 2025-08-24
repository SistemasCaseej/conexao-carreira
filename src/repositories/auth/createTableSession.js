import {addDoc, collection, deleteDoc, doc, getDocs, query, where} from "firebase/firestore";
import {db} from "@/firebase/config";

export async function CreateTableSession(userId, expiresAt, role) {

    try{
        const sessionUsersRef = collection(db, "sessions");

        const docRef = await addDoc(sessionUsersRef, {
            userId,
            expiresAt,
            role
        })

        return docRef.id;
    }catch(error){
        console.error("Erro ao criar a sessão do usuário", error);
        throw new Error("Falha ao criar sessão do usuário");
    }
}

export async function deleteUserSession(sessionId) {

    try{
        const sessionUsersRef = collection(db, "sessions");

        const queryUser = query(sessionUsersRef, where ("userId", "==", sessionId));

        const querySnapshot = await getDocs(queryUser);


        if (querySnapshot.empty) {
            console.log("Nenhuma sessão encontrada para esse usuário.");
            return null;
        }

        for (const document of querySnapshot.docs) {
            await deleteDoc(doc(db, "sessions", document.id));
            console.log(`Documento ${document.id} deletado com sucesso.`);
        }
    }catch (error) {
        console.error("Erro ao deletar sessão:", error);
    }
}