import {NextResponse} from "next/server";
import {createJobSchema} from "@/dto/job/job.dto";
import {createJobService, getAllJobsService} from "@/services/jobService";


export async function GET() {
    const jobs = await getAllJobsService()

    return NextResponse.json(jobs)
}

export async function POST(req) {

    const body = await req.json();

    const jobId = await createJobService(body)

    return NextResponse.json(
        {
            success: true,
            message: "Vaga postada com sucesso!",
            data: {jobId},
        }
    )
}