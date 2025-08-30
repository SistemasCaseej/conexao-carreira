import {addDoc, arrayUnion, collection, doc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {db} from "@/firebase/config";

export async function createApplicationRepository(application) {

    const { userId, jobId, resume, companyId} = application;

    const applicationRef = await collection(db, "applications");

    const appRef = await addDoc(applicationRef, {
        userId,
        jobId,
        companyId,
        applied_at: new Date().toLocaleString("pt-BR"),
        status: "Em análise",
        resume: resume
    });

    const jobRef = doc(db, "jobs", jobId)
    await updateDoc(jobRef, {
        applications: arrayUnion({
            applicationId: appRef.id,
            userId,
            resume,
            createdAt: new Date(),
        }),
    })

    return applicationRef.id
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