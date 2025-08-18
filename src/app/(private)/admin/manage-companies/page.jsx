'use client'

import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import CompanyForm from "@/components/CompanyForm";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";


export default function ManageCompanies() {

    const router = useRouter();
    const [companies, setCompanies] = useState([]);
    const [searchCompany, setSearchCompany] = useState("");


    const handleCompany = (id) => {
        router.push(`/admin/information-company/${id}`);
    }

    const filteredCompanies = companies.filter(company => company.legalName.toLowerCase().includes(searchCompany.toLowerCase()));

    useEffect(() => {
        async function loadCompanies() {
            try {
                const response = await fetch("/api/company", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setCompanies(data);

                if(response.ok) {
                    router.refresh();
                }

            }catch (error) {
                console.error("Erro ao carregar as empresas", error)
            }
        }

        loadCompanies()
    },[])

    return (
        <section className="py-12 px-8 bg-white">
            <h1 className="text-2xl font-semibold mb-5">Empresas Cadastradas</h1>
            <div className="flex flex-row justify-between items-center">
                <Input placeholder="Pesquisar Empresas" className="max-w-sm border" value={searchCompany} onChange={(e) => setSearchCompany(e.target.value)} />
                <CompanyForm/>
            </div>
            <div className="grid gap-4 mt-5 [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))]">
                {filteredCompanies.map((company, index) => (
                        <Card key={index} onClick={()=> handleCompany(company.id)} className="p-4 cursor-pointer flex flex-row max-w-[380px] border-2 border-[#49257b]">
                            <div>
                                <Image src="/jose.jpg" alt="eu" width="50" height="50" className="rounded-full w-fit"/>
                            </div>
                            <div className="flex flex-col">
                                <CardHeader className="mb-5">
                                    <CardTitle>{company.tradeName}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{company.cnpj}</p>
                                </CardContent>
                            </div>

                        </Card>
                ))}

            </div>
        </section>
    )
}