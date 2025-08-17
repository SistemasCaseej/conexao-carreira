import {NextResponse} from "next/server";
import {createJobSchema} from "@/dto/job/job.dto";
import {createJobService} from "@/services/jobService";

export async function POST(req) {

    const body = await req.json();

    // const result = createJobSchema.safeParse(body);
    //
    // if(!result.success) {
    //     const formattedErrors = result.error.format();
    //     return NextResponse.json(
    //         {
    //             success: false,
    //             message: "Dados inválidos",
    //             errors: formattedErrors,
    //         }
    //     )
    // }

    // const jobDto = result.data;

    const jobId = await createJobService(body)

    return NextResponse.json(
        {
            success: true,
            message: "Vaga postada com sucesso!",
            data: {jobId},
        }
    )
}