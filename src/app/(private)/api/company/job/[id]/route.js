import {NextResponse} from "next/server";
import {getJobByCompanyIdService} from "@/services/jobService";

export async function GET(_request, {params}) {

    const {id} = await params;

    if (!id) {
        return NextResponse.json(
            {success: false, error: "No such document id"},
            {status: 400},
        )
    }

    try {
        const company = await getJobByCompanyIdService(id);

        return NextResponse.json(
            {success: true, message: "Vagas encontradas", data: {company}},
            {status: 200},
        );
    } catch (error) {
        console.error("Failed find document:", error);

        return NextResponse.json(
            {success: false, error: "Não existe vagas de emprego para essa empresa"},
            {status: 500}
        );
    }

}