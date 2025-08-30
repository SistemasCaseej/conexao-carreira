import {updatePendingUserService} from "@/services/userService.js";
import {NextResponse} from "next/server";


export async function PATCH(req, {params}) {

    try {
        const {id} = params;

        const { enrollmentProof } = await req.json();

        console.log(enrollmentProof);
        console.log(id);

        if (!enrollmentProof) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Não existe comprovante de matrícula",
                },
                {status: 400}
            );
        }

        await updatePendingUserService(id, enrollmentProof);

        return NextResponse.json(
            {
                success: true,
                message: "Cadastro realizado com sucesso!",
            },
            {status: 201}
        );
    }catch (error) {
        console.error(error);

    }
}