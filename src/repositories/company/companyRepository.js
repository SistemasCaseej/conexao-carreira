import {addDoc, collection, getDocs, query} from "firebase/firestore";
import {db} from "@/firebase/config";

export async function createCompanyRepository(address, businessSector, city, cnpj, companySize, legalName, site, tradeName, users) {

    try{
        const companyRef = await collection(db, "companies");

        const docRef = await addDoc(companyRef, {
            address: address ?? null,
            businessSector: businessSector ?? null,
            city : city ?? null,
            cnpj,
            companySize: companySize ?? null,
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