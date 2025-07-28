'use client'

import { DataTable } from "@/app/(private)/admin/pending-users/data-table";
import { getColumns } from "@/app/(private)/admin/pending-users/columns";
import { approveUser, rejectUser } from "@/app/actions/users";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function ClientTable({data, actions}){

    const router = useRouter();

    const handleApprove = async (id, email) => {
        try {
            await approveUser(id, email);
            toast.success("Usuário aprovado com sucesso!!");
            router.refresh();
        } catch (error) {
            toast.error("Erro ao aprovar usuário");
        }
    }

    const handleReject = async (id) => {
        try {
            await rejectUser(id);
            toast.error("Usuário rejeitado com sucesso", {
                className: "bg-red-600 text-white",
            });
            router.refresh();
        } catch (error) {
            toast.error("Erro ao rejeitar usuário");
        }
    }

    const columns = getColumns({ onApprove: handleApprove, onReject: handleReject, actions: actions });

    return <DataTable columns={columns} data={data}/>
}