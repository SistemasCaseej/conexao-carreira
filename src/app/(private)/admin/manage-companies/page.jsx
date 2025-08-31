'use client'

import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import CompanyForm from "@/components/CompanyForm";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";


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

                if(response.ok && data.length > 0) {
                    toast.success("Todas as empresas do sistema!", {
                        style: {
                            border: "1px solid #22c55e",
                            padding: "16px",
                            color: "#fff",
                            background: "#16a34a",
                        },
                        iconTheme: {
                            primary: "#16a34a",
                            secondary: "#fff",
                        },
                    })
                }else {
                    toast.error("Não existem empresas cadastradas no sistema", {
                        style: {
                            border: "1px solid #ef4444",
                            padding: "16px",
                            color: "#fff",
                            background: "#dc2626",
                        },
                        iconTheme: {
                            primary: "#dc2626",
                            secondary: "#fff",
                        },
                    })
                }

                router.refresh();
            }catch (error) {
                console.error("Erro ao carregar as empresas", error)
            }
        }

        loadCompanies()
    },[])

    return (
        <section className="py-12 px-8 bg-white">
            <h4 className="mb-5">EMPRESAS CADASTRADAS</h4>
            <div className="flex flex-row justify-between items-center">
                <Input placeholder="Pesquisar Empresas" className="max-w-sm border" value={searchCompany} onChange={(e) => setSearchCompany(e.target.value)} />
                <CompanyForm/>
            </div>
            <div className="grid gap-x-2 gap-y-2 mt-5 [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))]">
                {filteredCompanies.map((company, index) => (
                        <Card key={index} onClick={()=> handleCompany(company.id)} className="p-4 cursor-pointer flex flex-row items-center justify-between max-w-[330px] border-2">
                            <div>
                                <Image src={company.logo ?? "/jose.jpg"} alt="image" width="50" height="50" className="rounded-sm w-fit border-1"/>
                            </div>
                            <div className="flex flex-col ">
                                <CardHeader className="mb-5 p-0 min-w-[205px]">
                                    <CardTitle>{company.tradeName}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <p>{company.cnpj}</p>
                                </CardContent>
                            </div>
                        </Card>
                ))}

            </div>
        </section>
    )
}