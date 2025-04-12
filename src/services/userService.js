
//O serviço implementa a lógica de negócios. Ele interage com o repositório para buscar, criar ou modificar dados.

import * as userRepository from "../repositories/userRepository";

//Exemplo - Função para recuperar todos os usuários
export async function getAllUsers(){
    return await userRepository.getAll()
}