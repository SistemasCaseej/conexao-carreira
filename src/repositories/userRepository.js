//O repositório contém funções que interagem diretamente com o banco de dados.

import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {auth, db} from "@/firebase/config"
import {generateSecurePassword} from "@/utils/generatePassword";
import {createUserWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";

export async function getAllPendingUsers() {

    try{
        const usersRef = collection(db, "users");

        const q = query(usersRef, where ("status", "==", "Pendente"));

        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => ({

            id: doc.id,
            ...doc.data(),
        }));
    }catch (err){
        console.error("Erro ao criar usuário", err);
        throw new Error("Falha ao criar possível usuário");
    }


}

export async function getAllAdminUsers(){
    const usersRef = collection(db, "users");

    const q = query(usersRef, where ("role", "==", "Admin"));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
}

export async function createPendingUser(name, email, cpf, phoneNumber, linkedIn, city, enrollmentProof) {

    const pendingUsersRef = collection(db, "users");

    const docRef = await addDoc(pendingUsersRef, {
        name,
        email,
        cpf,
        phoneNumber,
        linkedIn,
        city,
        companyId: null,
        status : "Pendente",
        role : "Candidate",
        enrollmentProof
    })

    return docRef.id
}

export async function createAdminUser(name, email, cpf, phoneNumber, linkedIn, city, companyId) {

    const temporaryPassword = generateSecurePassword();

    const userCredential = await createUserWithEmailAndPassword(auth, email, temporaryPassword);

    const pendingUsersRef = collection(db, "users");

    const docRef = await addDoc(pendingUsersRef, {
            name,
            email,
            cpf,
            phoneNumber,
            linkedIn,
            city,
            companyId: companyId,
            status : "Aprovado",
            role : "Admin",
            userId : userCredential.user.uid
        })

    await sendPasswordResetEmail(auth, email);

    return docRef.id;
}

export async function hasExistingEmail(email) {

    try{
        const userRef = collection(db, "users");

        const queryUser = query(userRef, where ("email", "==", email));

        const querySnapshot = await getDocs(queryUser);

        return !querySnapshot.empty;


    }catch (error) {
        console.error("❌ Erro ao buscar email do usuário:", error);

        throw new Error("Erro ao buscar usuário no Firestore.");
    }
}

export async function cpfAlreadyExists(cpf){

    try {
        const userRef = collection(db, "users");

        const queryUser = query(userRef, where ("cpf", "==", cpf));

        const querySnapshot = await getDocs(queryUser);

        return !querySnapshot.empty;

    }catch (error) {
        console.error("Erro ao buscar CPF do usuário:", error);

        throw new Error("Erro ao buscar usuário no Firestore.");
    }
}

export async function getAllApprovedUsers() {

    const usersRef = collection(db, "users");

    const q = query(usersRef, where ("status", "==", "Aprovado"),  where("role", "==", "Candidate") );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
}

export async function deleteUserById(id) {

    const docRef = doc(db, "users", id);

    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        throw new Error("Documento não encontrado.");
    }

    const data = docSnap.data();


    await deleteDoc(docRef);
    console.log("Usuário deletado com sucesso.");

}

export async function approveUserById(userId, email) {

        const temporaryPassword = generateSecurePassword();

        const userCredential = await createUserWithEmailAndPassword(auth, email, temporaryPassword);

        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
            status: "Aprovado",
            approvedAt : new Date().toISOString(),
            userId: userCredential.user.uid,
        })

        await sendPasswordResetEmail(auth, email);

        const user = userCredential.user;
}

export async function getUserInfoSession(session) {
    const userRef = collection(db, "users");
    const queryUser = query(userRef, where ("userId", "==", session.userId));

    const querySnapshot = await getDocs(queryUser);

    if(querySnapshot.empty){
        return null;
    }

    const userDoc = querySnapshot.docs[0];

    return {
        userId: userDoc.id,
        ...userDoc.data()
    }
}

export async function getUserByDocumentId(documentId) {

    const docRef = doc(db, "users", documentId);

    const docSnap = await getDoc(docRef);

    if(!docSnap.exists()) {
        throw new Error("Documento não encontrado")
    }

    return docSnap.data();
}

export async function getUserByUserId(userId) {

    const usersRef = collection(db, "users");
    const q = query(usersRef, where ("userId", "==", userId));

    const querySnapshot = await getDocs(q);

    if(querySnapshot.empty) {
        throw new Error("Usuário não encontrado")
    }

    const userDoc = querySnapshot.docs[0];

    return userDoc.data();
}

export async function createUserCompany(name, email, cpf, phoneNumber, linkedIn, city, companyId) {

    const temporaryPassword = generateSecurePassword();

    const userCredential = await createUserWithEmailAndPassword(auth, email, temporaryPassword);

    const pendingUsersRef = collection(db, "users");

    const docRef = await addDoc(pendingUsersRef, {
        name,
        email,
        cpf,
        phoneNumber,
        linkedIn,
        city,
        companyId,
        status : "Aprovado",
        role : "Employee",
        userId : userCredential.user.uid
    })

    await sendPasswordResetEmail(auth, email);

    return docRef.id;
}

export async function getUsersWithCompany() {
    const usersRef = collection(db, "users");

    const q = query(usersRef, where("companyId", "!=", null), where("role", "==", "Employee"));

    const querySnapshot = await getDocs(q);
    const users = [];

    for (const docSnap of querySnapshot.docs) {
        const userData = docSnap.data();

        let companyData = null;
        if (userData.companyId) {
            const companyRef = doc(db, "companies", userData.companyId);
            const companySnap = await getDoc(companyRef);
            if (companySnap.exists()) {
                companyData = { id: companySnap.id, ...companySnap.data() };
            }
        }

        users.push({
            id: docSnap.id,
            ...userData,
            company: companyData
        });
    }

    return users;
}
