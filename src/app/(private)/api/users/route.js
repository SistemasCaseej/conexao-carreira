//O controlador(Controller) é a parte do sistema que recebe as entradas do usuário (geralmente ações ou comandos)

import { NextRequest, NextResponse } from 'next/server'
import { getAll } from "@/src/repositories/userRepository";


// Rota GET para listar todos os usuários
export async function GET(req) {

    // Chama o controller para obter todos os usuários
    const users = await getAll();

    // Retorna a lista de usuários no formato JSON
    return NextResponse.json(users)
}


