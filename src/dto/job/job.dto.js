import {z} from "zod";

export const jobSchema = z.object({
    title: z.string().min(1, "Título da vaga é obrigatório"),
    location: z.string().min(1, "Localização é obrigatória"),
    requirements: z.array(z.string()).min(1, "Adicione pelo menos um requisito"),
    benefits: z.array(z.string()).min(1, "Adicione pelo menos um benefício"),
    description: z.string().min(1, "Descrição é obrigatória"),
    employmentType: z.string().min(1, "Tipo de contratação é obrigatório"),
    workModel: z.string().min(1, "Modelo de trabalho é obrigatório"),
    salaryRange: z.object({
        minSalary: z.union([z.string(), z.number()]).optional(),
        maxSalary: z.union([z.string(), z.number()]).optional(),
        notInformed: z.boolean(),
    }).refine(
        (data) => data.notInformed || (data.minSalary && data.maxSalary),
        "Informe o salário ou marque 'Não informado'"
    ),
});