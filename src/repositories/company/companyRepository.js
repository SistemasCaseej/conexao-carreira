import {addDoc, collection} from "firebase/firestore";
import {db} from "@/firebase/config";

export async function createCompanyRepository(address, area, city, cnpj, description, email, logoUrl, name, phone, site) {

    try{
        const companyRef = await collection(db, "companies");

        const docRef = await addDoc(companyRef, {
            address,
            area,
            city,
            cnpj,
            description,
            email,
            logoUrl,
            name,
            phone,
            site
        });

        return docRef.id;

    }catch (error) {
        console.log("Error ao criar a empresa");
    }
}