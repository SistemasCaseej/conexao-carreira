import {db} from "@/firebase/config";
import {addDoc, collection, doc, updateDoc, arrayUnion} from "firebase/firestore";


export async function createJobRepository(job) {

    const { companyId = "r9HHteTaLfgwbTFf06Tn", title, description, requirements, responsibilities, location, employmentType, seniority, salaryRange, benefits, status} = job;

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