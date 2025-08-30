//DTO - Company
import { z } from 'zod'

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export const createCompanySchema = z.object({
    address: z.string()
        .max(40, "Informe um endereço")
        .optional(),
    businessSector: z.string()
        .max(40, "Por favor, digite uma área de atuação com até 40 caracteres")
        .optional(),
    city: z.string()
        .max(40, "Informe uma cidade com até 40 caracteres")
        .optional(),
    cnpj: z.string()
        .max(18, "Informe um CNPJ, com exatos 18 caracteres")
        .nonempty("O CNPJ da empresa é obrigatório")
        .refine((doc) => {
            const cnpjFormatRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
            return cnpjFormatRegex.test(doc);
        }, 'CNPJ deve estar no formato 00.000.000/0000-00.'),
    companySize: z.string()
        .max(80, "Informe uma descrição com até 100 caracteres")
        .optional(),
    legalName: z.string()
        .nonempty("O nome da empresa é obrigatório")
        .max(50, "Por favor, digite um nome com até 40 caracteres."),
    site: z.string()
        .url()
        .optional(),
    tradeName: z.string()
        .nonempty("O nome da empresa é obrigatório")
        .max(50, "Por favor, digite um nome com até 40 caracteres."),
    users: z.array()
        .optional(),
    logo: z.string().url({ message: "O logo deve ser uma URL válida" })
    .optional()
})

