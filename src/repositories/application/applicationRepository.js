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


function chunkArray(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}

export async function getApplicationsByJobIdRepository(jobId) {
    const applicationRef = collection(db, "applications");
    const q = query(applicationRef, where("jobId", "==", jobId));

    const querySnapshot = await getDocs(q);

    const applications = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));

    const userIds = [...new Set(applications.map(app => app.userId))].filter(Boolean);
    if (userIds.length === 0) return applications;

    const chunks = chunkArray(userIds, 10);

    const usersRef = collection(db, "users");
    const userSnapshotsPromises = chunks.map(async (chunk) => {
        const q = query(usersRef, where("userId", "in", chunk));
        return getDocs(q);
    });

    const snapshots = await Promise.all(userSnapshotsPromises);

    const users = snapshots.flatMap(snap =>
        snap.docs.map(doc => {
            const data = doc.data();
            return {
                name: data.name,
                email: data.email,
                linkedIn: data.linkedIn,
                phoneNumber: data.phoneNumber,
                userId: data.userId,
            }
        }));

    return applications.map(app => {
        const userData = users.find(u => u.userId === app.userId);
        return {...app, user: userData};
    });

}

export async function updateApplicationRepository(id, resume){
    const appRef = doc(db, "applications", id);

    return await updateDoc(appRef, { resume });
}
