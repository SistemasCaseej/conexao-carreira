//DTO - Company
import { z } from 'zod'

export const createCompanySchema = z.object({

    address: z.string()
        .max("40", "Informe um endereço")
        .optional(),
    area: z.string()
        .max(40, "Por favor, digite uma área de atuação com até 40 caracteres")
        .optional(),
    city: z.string()
        .max(40, "Informe uma cidade com até 40 caracteres")
        .nonempty("A cidade da empresa é obrigatório"),
    cnpj: z.string()
        .max(18, "Informe um CNPJ, com exatos 18 caracteres")
        .nonempty("O CNPJ da empresa é obrigatório")
        .refine((doc) => {
            const digits = doc.replace(/\D/g, '');
            return !!Number(digits);
        }, 'CNPJ deve conter apenas números.')
        .refine((doc) => {
            const cnpjFormatRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
            return cnpjFormatRegex.test(doc);
        }, 'CNPJ deve estar no formato 00.000.000/0000-00.'),
    description: z.string()
        .max("80", "Informe uma descrição com até 100 caracteres"),
    email: z.string()
        .email(),
    logoUrl: z.string()
        .url()
        .optional(),
    name: z.string()
        .nonempty("O nome da empresa é obrigatório")
        .max(40, "Por favor, digite um nome com até 40 caracteres."),
    phone: z.string()
        .optional(),
    site: z.string()
        .url()
        .optional(),
})


/*

 body.address,
                body.area,
                body.city,
                body.cnpj,
                body.description,
                body.email,
                body.logoUrl,
                body.name,
                body.phone,
                body.site,
*/