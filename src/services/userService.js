
//O serviço implementa a lógica de negócios. Ele interage com o repositório para buscar, criar ou modificar dados.

import * as userRepository from "../repositories/userRepository";

//User

//Função para criar um possível usuário do sistema
export async function createPendingUser(name, email, cpf, phoneNumber, linkedIn, city){
    return await userRepository.createPendingUser(name, email, cpf, phoneNumber, linkedIn, city);
}

//Função para pegar todos os usuários que estão aguardando aprovação
export async function getAllPendingUsers(){
    return await userRepository.getAllPendingUsers()
}

//Função para pegar todos os usuários que estão aprovados
export async function getAllApprovedUsers(){
    return await userRepository.getAllApprovedUsers();
}

export async function approveUserById(userId, email) {
    return await userRepository.approveUserById(userId, email);
}

export async function deleteUserById(userId){
    return await userRepository.deleteUserById(userId)
}

export async function getUserByDocumentId(documentId){
    return await userRepository.getUserByDocumentId(documentId);
}

export async function getUserInfoSession(session){
    return await userRepository.getUserInfoSession(session);
}


//Essa função verifica se o email cadastrado já está sendo utilizado por outro usuário
export async function hasExistingEmail(email){
    return await userRepository.hasExistingEmail(email)
}

//Essa função verifica se o cpf cadastrado já está sendo utilizado por outro usuário
export async function cpfAlreadyExists(cpf){
    return await userRepository.cpfAlreadyExists(cpf);
}