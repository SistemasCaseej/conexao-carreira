import {z} from "zod";

export const createJobSchema = z.object({

    title: z.string()
        .min(1, "Title is required")
        .max(50, "Title is required"),
    description: z.string()
        .min(1, "Description is required")
        .max(100, "Description is required"),
    requirements: z.array(z.string()),
    responsibilities: z.array(z.string()).optional(),
    location: z.string().optional(),
    employmentType: z.enum(["Tempo integral", "Meio período", "Estágio", "Freelance"]).optional(),
    seniority: z.enum(["Junior", "Mid-level", "Senior", "Trainee"]).optional(),
    salaryRange: z.object().optional(),
    postedAt: z.date().optional(),
    benefits: z.array(z.string()).optional(),
    companyId: z.string().min(1, "Company ID is required").optional(),
    status: z.enum(["Open", "Closed"]).optional()

})

