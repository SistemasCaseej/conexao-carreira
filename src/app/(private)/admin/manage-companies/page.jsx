'use client'

import { Input } from "@/components/ui/input"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {createCompany} from "@/app/actions/companies/actions";
import {useActionState, useEffect, useState} from "react";
import {toast} from "sonner";
import CompanyForm from "@/components/CompanyForm";
import Image from "next/image";

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
                <Input placeholder="Pesquisar Empresas" className="max-w-sm border"/>
                <CompanyForm/>
            </div>
            <div className="flex flex-row flex-wrap justify-between items-center">
                <Card className="mt-5 sm:min-w-[400px] flex-row">
                    <div className="bg-yellow-400">
                        <Image src="/jose.jpg" alt="eu" width="50" height="50" className="rounded-full w-fit bg-red-600"/>
                    </div>
                    <div className="bg-pink-400">
                        <CardHeader>
                            <CardTitle>MHWIRTH</CardTitle>
                        </CardHeader>
                        <CardContent className="bg-pink-400">
                            <p>Card Content</p>
                        </CardContent>
                    </div>

                </Card>
            </div>
        </section>
    )
}