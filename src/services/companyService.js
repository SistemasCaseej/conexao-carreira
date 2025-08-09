import * as companyRepository from "../repositories/company/companyRepository";

export async function createCompanyService(address, businessSector, city, cnpj, companySize, legalName, site, tradeName, users) {
    return await companyRepository.createCompanyRepository(address, businessSector, city, cnpj, companySize, legalName, site, tradeName, users);
}

export async function getAllCompaniesService() {
    return await companyRepository.getAllCompaniesRepository()
}