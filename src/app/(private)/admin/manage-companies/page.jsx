'use client'

import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {createCompany} from "@/app/actions/companies/actions";
import {useActionState, useEffect, useState} from "react";
import {toast} from "sonner";
import {AdminForm} from "@/components/AdminForm";

const initialState = {
    success: false,
    message: '',
    data: ''
};


export default function ManageCompanies() {
    const [state, formAction] = useActionState(createCompany, initialState);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        if(state.success){
            toast.success("Company created successfully!");
            setOpen(false);
        }
    }, [state.success])

    return (
        <section className="py-12 px-8">
            <h1 className="text-2xl font-semibold mb-5">Empresas Cadastradas</h1>
            <div className="flex flex-row justify-between items-center">
                <Input type={"text"} placeholder={"Pesquisar"} className="rounded-none"/>
                <AdminForm/>
            </div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </section>
    )
}