'use server'

import { createCompanyService } from "@/services/companyService";

export async function createCompany(_, formData){

    try{
        const infoCompany = {
            address: formData.get('address'),
            businessSector: formData.get('businessSector'),
            cnpj: formData.get('cnpj'),
            city: formData.get('city'),
            description: formData.get('description'),
            name: formData.get('name'),
            site: formData.get('site'),
            phone: formData.get('phone'),
        }

        const response = await createCompanyService(
            infoCompany.address, infoCompany.area, infoCompany.city, infoCompany.cnpj,
            infoCompany.description, infoCompany.description, infoCompany.name, infoCompany.phone, infoCompany.site
        )

        return {
            success: true,
            message: "Empresa criada com sucesso!",
            data: { response },
        };
    }catch (error){
        console.error("Erro ao criar empresa:", error);
        return {
            success: false,
            message: "Erro interno ao criar empresa.",
            error: error instanceof Error ? error.message : String(error),
        };
    }
}