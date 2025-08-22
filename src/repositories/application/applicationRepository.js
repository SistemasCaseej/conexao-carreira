import {addDoc, collection, doc, getDocs, query, where} from "firebase/firestore";
import {db} from "@/firebase/config";

export async function createApplicationRepository(application) {

    const { userId, jobId, resume} = application;

    const applicationRef = await collection(db, "applications");

    return await addDoc(applicationRef, {
        userId,
        jobId,
        applied_at: new Date().toLocaleString("pt-BR"),
        status: "Em análise",
        resume: resume
    });

}

export async function getApplicationByUserRepository(userId) {

    const q =
        query(
            collection(db, "applications"),
            where("userId", "==", userId)
        );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => (
        {
            id: doc.id,
            ...doc.data()
        }
    ));
}

export async function getAllApplicationsRepository() {

    const q = query(collection(db, "applications"));

    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
}