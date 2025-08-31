import { NextResponse } from "next/server";
import {createAdminUser} from "@/services/userService";
import {createCompanyService} from "@/services/companyService";

export async function POST(request) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (token !== process.env.ADMIN_INIT_TOKEN) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const companyId = await createCompanyService("Avenida Aluizio da Silva Gomes, 50 - Bairro da Gloria, Macae - RJ, 27.930-560", null, "Macaé", "26.676.739/0001-01", null, "Case Empresa Junior", "http://127.0.0.1:9199/v0/b/conexao-carreira.firebasestorage.app/o/companies%2Flogo_case.png?alt=media&token=12e2e6ec-b383-43c2-8908-60006667baf3", null, "Case Empresa Junior");
    await createAdminUser("José Silva", "jvitorfacanha@gmail.com", "162.851.287-31", "(22) 99724-7140", "https://www.linkedin.com/in/jose-vitor-facanha/", "Macaé", companyId );
    return NextResponse.json({ message: "Empresa CASEEJ e usuário administrador criados com sucesso"});
}