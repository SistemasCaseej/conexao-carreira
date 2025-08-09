'use client'

import { Input } from "@/components/ui/input"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import CompanyForm from "@/components/CompanyForm";
import Image from "next/image";

export default function ManageCompanies() {

    return (
        <section className="py-12 px-8">
            <h1 className="text-2xl font-semibold mb-5">Empresas Cadastradas</h1>
            <div className="flex flex-row justify-between items-center">
                <Input placeholder="Pesquisar Empresas" className="max-w-sm border"/>
                <CompanyForm/>
            </div>
            <div className="flex flex-row flex-wrap justify-between items-center">
                <Card className="mt-5 sm:min-w-[350px] flex flex-row justify-around cursor-pointer">
                    <div>
                        <Image src="/jose.jpg" alt="eu" width="50" height="50" className="rounded-full w-fit"/>
                    </div>
                    <div className="flex flex-col">
                        <CardHeader className="mb-5">
                            <CardTitle>MHWIRTH</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>12.169.764/0001-94</p>
                        </CardContent>
                    </div>

                </Card>
            </div>
        </section>
    )
}