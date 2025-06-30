"use client"

import {DataTable} from "@/app/(private)/admin/candidates/data-table";
import {getColumns} from "@/app/(private)/admin/candidates/columns";

export default function ClientTable({data}){
    const handleApprove = (id) => {
        console.log("Aprovar:", id)
    }

    const handleReject = (id) => {
        console.log("Recusar:", id)
    }

    const columns = getColumns({ onApprove: handleApprove, onReject: handleReject })

    return <DataTable columns={columns} data={data}/>
}