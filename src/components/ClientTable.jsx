"use client"

import {DataTable} from "@/app/(private)/admin/pending-users/data-table";
import {getColumns} from "@/app/(private)/admin/pending-users/columns";
import {approveUser, rejectUser} from "@/app/actions/users";

export default function ClientTable({data, actions}){
    const handleApprove = (id, email) => {
        approveUser(id, email)
    }

    const handleReject = (id) => {
        rejectUser(id);
    }

    const columns = getColumns({ onApprove: handleApprove, onReject: handleReject, actions: actions });

    return <DataTable columns={columns} data={data}/>
}