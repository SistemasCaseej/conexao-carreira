"use client"

import {DataTable} from "@/app/(private)/admin/candidates/data-table";
import {getColumns} from "@/app/(private)/admin/candidates/columns";
import {approveUser, rejectUser} from "@/app/(public)/candidate-registration/actions/users";

export default function ClientTable({data}){
    const handleApprove = (id, email) => {
        approveUser(id, email)
    }

    const handleReject = (id) => {
        rejectUser(id);
    }

    const columns = getColumns({ onApprove: handleApprove, onReject: handleReject })

    return <DataTable columns={columns} data={data}/>
}