
//O serviço implementa a lógica de negócios. Ele interage com o repositório para buscar, criar ou modificar dados.

import * as userRepository from "../repositories/userRepository";
import { z } from "zod";
import {NextResponse} from "next/server";


//User

export const createUserSchema = z.object({
    name: z.string()
        .nonempty("O nome é obrigatório"),
    email: z.string()
        .email("Email inválido")
        .nonempty("O email é obrigatório"),
    cpf: z.string()
        .nonempty("O cpf não pode ser vazio"),
    phoneNumber: z.string()
        .regex(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, "Telefone inválido"),
    linkedIn: z.string()
        .nonempty("O campo linkedin precisa ser informado"),
    city: z.string()
        .nonempty("A cidade não pode ser vazio"),
    password: z.string()
        .min(6, "Senha deve ter no mínimo 6 caracteres")
        .nonempty("A senha é obrigatório"),
    confirmPassword: z.string()
        .min(6, "Senha deve ter no mínimo 6 caracteres")
        .nonempty("A senha é obrigatório")
})


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