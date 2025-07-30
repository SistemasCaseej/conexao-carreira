import { NextResponse } from "next/server";
import {deleteUserById, getUserByDocumentId} from "@/services/userService";


export async function GET(_request, {params}) {

    const { id } = await params

    if(!id){
        return NextResponse.json(
            { success: false, error: "No such document id" },
            {status: 400 },
        )
    }

    try{

        const user = await getUserByDocumentId(id);


        return NextResponse.json(
            { success: true, message: "User found" , data: { user } },
            { status: 200 },

        );
    }catch (error){
        console.error("Failed find document:", error);

        return NextResponse.json(
            { success: false, error: "User not found" },
            { status: 500 }
        );
    }
}

export async function DELETE(_request, {params}) {

    const { id } = await params;

    if (!id) {
        return NextResponse.json(
            { success: false, error: "ID document is required." },
            { status: 400 }
        );
    }

    try {
        await deleteUserById(id);

        return NextResponse.json(
            { success: true, message: "User deleted successfully." },
            { status: 200 }
        );
    }catch (error){
        console.error("Failed to delete user:", error);

        return NextResponse.json(
            { success: false, error: "User not found or could not be deleted." },
            { status: 500 }
        );
    }
}