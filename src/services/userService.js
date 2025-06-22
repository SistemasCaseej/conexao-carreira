
//O serviço implementa a lógica de negócios. Ele interage com o repositório para buscar, criar ou modificar dados.

import * as userRepository from "../repositories/userRepository";
import { z } from "zod";
import {NextResponse} from "next/server";

//Exemplo - Função para recuperar todos os usuários
export async function getAllUsers(){
    return await userRepository.getAll()
}

//User

export const createUserSchema = z.object({
    email: z.string()
        .email("Email inválido")
        .nonempty("O email é obrigatório"),
    password: z.string()
        .min(6, "Senha deve ter no mínimo 6 caracteres")
        .nonempty("A senha é obrigatório")
})

export async function createUser(email, password){

    try {
        return await userRepository.createUser(email, password);
    }catch (error) {
        console.log("Erro no service ao criar possível usuário")
        throw new Error("Erro ao criar usuário")
    }

}
