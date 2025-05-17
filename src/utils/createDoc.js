import {db} from "@/src/firebase/config";
import { collection, addDoc } from "firebase/firestore";


export async function createJob(){

    try {
        const docRef = await addDoc(collection(db, "empregos"), {
            empresa: "Weathford",
            country: "Australia"
        });
        console.log("Document written with ID: ", docRef.id);

        return docRef.id;
    }catch (err){
        console.log(err.message);
    }

}