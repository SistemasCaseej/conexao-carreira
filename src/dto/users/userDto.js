//DTO - USER
import {z} from "zod";

export const createPendingUserSchema = z.object({
    name: z.string()
        .nonempty("O nome é obrigatório")
        .max(40, "Por favor, digite um nome com até 40 caracteres."),
    email: z.string()
        .email("Email inválido")
        .nonempty("O email é obrigatório")
        .max(80),
    cpf: z.string()
        .nonempty("O CPF não pode ser vazio.")
        .refine((cpf) => /^\d+$/.test(cpf), {
            message: "O CPF deve conter apenas números",
        })
        .transform((cpf) => cpf.replace(/\D+/g, ''))
        .refine((cpf) => cpf.length === 11, {
            message: "O CPF deve conter exatamente 11 números",
        }),
    phoneNumber: z.string()
        .regex(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, "Telefone inválido")
        .max(15),
    linkedIn: z.string()
        .nonempty("O campo linkedin precisa ser informado"),
    city: z.string()
        .nonempty("A cidade não pode ser vazio")
        .max(30),
})

export const deleteApprovedUser = z.object({
    cpf: z.string()
        .nonempty("O cpf não pode ser vazio")
        .transform((cpf) => cpf.replace(/[^\d]+/g, ''))
        .refine((cpf) => cpf.length === 11, {
            message : "O CPF deve conter 11 caracteres"
        }),
})

