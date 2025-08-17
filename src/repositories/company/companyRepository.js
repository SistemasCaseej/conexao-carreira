import {addDoc, collection, doc, getDoc, getDocs, query, updateDoc} from "firebase/firestore";
import {db} from "@/firebase/config";

export async function createCompanyRepository(address, businessSector, city, cnpj, companySize, legalName, site, tradeName, users, jobs) {

    try{
        const companyRef = await collection(db, "companies");

        const docRef = await addDoc(companyRef, {
            address: address ?? null,
            businessSector: businessSector ?? null,
            city : city ?? null,
            cnpj,
            companySize: companySize ?? null,
            jobs : jobs ?? [],
            legalName,
            site : site ?? null,
            tradeName,
            users : users ?? null,
        });

        return docRef.id;

    }catch (error) {
        console.log("Error ao criar a empresa");
    }
}

export async function getAllCompaniesRepository() {

    const q = query(collection(db, "companies"));

    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));

}

export async function getCompanyByIdRepository(documentId){

    const docRef = doc(db, "companies", documentId);

    const docSnap = await getDoc(docRef);

    if(!docSnap.exists()) {
        throw new Error("Documento não encontrado")
    }

    return docSnap.data();
}

export async function updateCompanyRepository(id, address, businessSector, city, cnpj, companySize, legalName, site, tradeName, users){


    const docRef = doc(db, "companies", id);

    const updatedData = {
        address: address,
        businessSector: businessSector,
        city: city,
        cnpj: cnpj,
        companySize: companySize,
        legalName: legalName,
        site: site,
        tradeName: tradeName,
        users: users,
    };

    await updateDoc(docRef, updatedData);

}
