'use client'

import { DataTable } from "@/app/(private)/admin/pending-users/data-table";
import {getColumnsApplication} from "@/components/ColumnsApplication.jsx";


export default function ApplicationTable({data, customSection}){

    const columnsApplications = getColumnsApplication();

    return <DataTable columns={columnsApplications} data={data} customSection={customSection} />
}