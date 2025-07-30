import { NextResponse } from "next/server";
import { deleteUserById } from "@/services/userService";


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