"use client";

import { getCompanyByIdService } from "@/services/companyService";
import InformationSection from "@/components/InformationSection";
import {useFetchDataById} from "@/hooks/useFetchDataById";
import {useState} from "react";


export default function CompanyDetailsClient({ id }) {

    const { data, setData, loading, error } = useFetchDataById(id, getCompanyByIdService);
    const [ableToEdit, setAbleToEdit] = useState(false);


    async function handleSaveCompany(id, data){

        const dataWithId = { ...data, id };

        try {
            const response = await fetch("/api/company/", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataWithId),
            });

            if (response.ok) {
                setAbleToEdit(false);
            } else {
                const errorData = await response.json();
                console.error("Failed to update company:", errorData);
            }
        } catch (error) {
            console.error("Network or unexpected error:", error);
        }

    }

    const translationMap = {
        address: "Endereço",
        businessSector: "Setor de Atuação",
        city: "Cidade",
        cnpj: "CNPJ",
        companySize: "Tamanho da Empresa",
        legalName: "Nome",
        site: "Site",
        tradeName: "Nome Fantasia"

    };


    return (
        <div className="pt-11 bg-[#f7f7f9] h-auto flex flex-col items-center gap-10">

            <div className="bg-white w-[90%] text-left p-5 border-2 border-[#1447e6] shadow-md" data-name="Dados básicos">
                <h1 className="uppercase text-xl">{data?.tradeName}</h1>
            </div>

            <InformationSection name={"Dados da Empresa"} data={data} setData={setData} translationMap={translationMap} handleSave={()=>handleSaveCompany(id, data)} ableToEdit={ableToEdit} setAbleToEdit={setAbleToEdit} />
        </div>
    )
}