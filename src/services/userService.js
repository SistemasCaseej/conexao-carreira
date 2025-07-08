
//O serviço implementa a lógica de negócios. Ele interage com o repositório para buscar, criar ou modificar dados.

import * as userRepository from "../repositories/userRepository";
import { z } from "zod";
import {NextResponse} from "next/server";


//User

//Função para criar um possível usuário do sistema
export async function createUser(name, email, cpf, phoneNumber, linkedIn, city, password, confirmPassword){

    try {
        return await userRepository.createUser(name, email, cpf, phoneNumber, linkedIn, city, password, confirmPassword);
    }catch (error) {
        console.log("Erro no service ao criar possível usuário")
        throw new Error("Erro ao criar usuário")
    }

}

//Função para pegar todos os usuários que estão aguardando aprovação
export async function getAllPendingUsers(){
    return await userRepository.getAllPendingUsers()
}

export async function getAllApprovedUsers(){
    return await userRepository.getAllApprovedUsers();
}