'use client'

import { DataTable } from "@/app/(private)/admin/pending-users/data-table";
import { getColumns } from "@/app/(private)/admin/pending-users/columns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function ClientTable({data, actions, approve, customSection}){

    const router = useRouter();

    const handleApprove = async (userId, email) => {
        try {

            const res = await fetch(`/api/users/approve`, {
                method: "POST",
                body: JSON.stringify({userId, email}),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Erro ao aprovar usuário");
            }

            toast.success("Usuário aprovado com sucesso!!", );
            router.refresh();
        } catch (error) {
            toast.error("Erro ao aprovar usuário");
        }
    }

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/users/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Erro ao deletar usuário");
            }

            toast.success(`Usuário deletado com sucesso`);

            router.refresh();
        } catch (error) {
            toast.error("Erro ao rejeitar usuário");
        }
    }

    const columns = getColumns({ onApprove: handleApprove, onReject: handleDelete, actions: actions , approve});

    return <DataTable columns={columns} data={data} customSection={customSection} />
}