"use client";

import { useEffect, useState } from "react";
import { getCompanyByIdService } from "@/services/companyService";
import { Building2, Pencil } from "lucide-react";


export default function CompanyDetailsClient({ id }) {

    const [excludedKeys, setExcludedKeys] = useState("users");
    const [data, setData] = useState([]);
    const [ableToEdit, setAbleToEdit] = useState(false);


    useEffect(()=>{
        async function fetchData(){
            try{
                const result = await getCompanyByIdService(id);
                setData(result);
            }catch (error){
                console.log("Erro buscando dados da empresa", id)
            }
        }

        if (id) {
            fetchData();
        }
    })

    function filterExcludedKeys(entries, excluded) {
        return entries.filter(([key]) => !excluded.includes(key));
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

            <div className="bg-white w-[90%] text-left p-5 border-2 border-[#6cd9ee] shadow-md" data-name="Dados básicos">
                <h1 className="uppercase text-xl">{data.tradeName}</h1>
            </div>

            <div className="bg-white w-[90%] border-2 border-[#6cd9ee] mb-10 flex flex-col justify-around p-4 shadow-lg" data-name="Dados básicos">
                <div className="mb-10 w-full flex items-center gap-5 pl-3 pt-2">
                    <div className="bg-[#6100d5] rounded-full p-2">
                        <Building2 className="text-yellow-50" size={30}/>
                    </div>
                    <h2 className="text-lg text-left font-sans">Dados da Organização</h2>
                </div>
                <div className="flex cursor-pointer w-fit ml-auto mr-4 pr-5">
                    <Pencil/>
                </div>
                <section className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-5 p-4">
                    {filterExcludedKeys(Object.entries(data), excludedKeys).map(([key, value], fieldIndex) => (
                            <div key={`${key}`} className="flex flex-col  p-2 mb-5">
                                <label className="text-sm text-gray-400 mb-2 font-normal">{translationMap[key] || key}</label>
                                {ableToEdit ? (
                                    <input className="outline-none w-[220px] text-md font-semibold" type="text" name={key} defaultValue={value  ?? ""} />
                                ): (
                                    <p className="w-[220px] text-md font-semibold outline-none">
                                        {value ?? ""}
                                    </p>
                                    )}
                            </div>
                        ))}
                </section>

            </div>

            {/*<div className="bg-white w-[90%] h-[200px] text-center p-5" data-name="Dados básicos">*/}
            {/*    <h1>Detalhes do Produto</h1>*/}
            {/*    <p>ID da empresa: {id}</p>*/}
            {/*</div>*/}

        </div>
    )
}