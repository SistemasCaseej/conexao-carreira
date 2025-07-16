import * as companyRepository from "../repositories/company/companyRepository";

export async function createCompanyService(address, area, city, cnpj, description, email, logoUrl, name, phone, site) {

    try{
        return await companyRepository.createCompanyRepository(address, area, city, cnpj, description, email, logoUrl, name, phone, site);
    }catch(error){
        console.log("Erro no service ao criar empresa")
        throw new Error("Erro ao criar empresa")
    }
}