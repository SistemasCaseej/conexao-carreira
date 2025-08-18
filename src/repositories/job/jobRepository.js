import {db} from "@/firebase/config";
import {addDoc, collection, doc, updateDoc, arrayUnion, getDocs, getDoc} from "firebase/firestore";


export async function createJobRepository(job) {

    const { companyId = "TwcENaLW8OpQoZi0H5MO", title, description, requirements, responsibilities, location, employmentType, seniority, salaryRange, benefits, status} = job;

    const companyRef = await collection(db, "jobs");

    const docRef = await addDoc(companyRef, {
        benefits : benefits ?? null,
        companyId : doc(db, "companies", companyId),
        description,
        employmentType : employmentType ?? null,
        location,
        posted_at : new Date().toLocaleString("pt-BR"),
        requirements,
        responsibilities : responsibilities ?? null,
        salaryRange : salaryRange ?? null,
        seniority : seniority ?? null,
        status : "Open",
        title,
    })

    const jobId = docRef.id

    const companyDocRef = doc(db, "companies", companyId);

    await updateDoc(companyDocRef, {
        jobs: arrayUnion(jobId),
    });

    return jobId;

}

export async function getAllJobsRepository() {

    const companyId = "TwcENaLW8OpQoZi0H5MO"

    const jobRef = collection(db, "jobs");

    const querySnapshot = await getDocs(jobRef)

    if(!querySnapshot) {
        throw new Error("Não existe vagas no sistema")
    }

    const jobs = await Promise.all(
        querySnapshot.docs.map(async (docSnap) => {
            const job = docSnap.data();

            const companySnap = await getDoc(job.companyId);

            return {
                id: docSnap.id,
                ...job,
                companyId: job.companyId.id,
                company: companySnap.exists() ? companySnap.data() : null,
            };
        })
    );

    return jobs;
}