import { NextResponse } from "next/server";
import { getApiDocs } from "@/lib/swagger";

export async function GET() {
    try {
        const docs = await getApiDocs();
        return NextResponse.json(docs);
    } catch (error) {
        console.error("Erro ao gerar documentação da API:", error);
        return new NextResponse("Erro interno ao gerar docs", { status: 500 });
    }
}
