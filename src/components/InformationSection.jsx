"use client"

import {Building2, Pencil} from "lucide-react";
import {useState} from "react";
import {Button} from "@/components/ui/button";

export default function InformationSection({name, data, setData, initialExcludedKeys, translationMap, handleSave, ableToEdit, setAbleToEdit, canEdit}) {

    const [excludedKeys, setExcludedKeys] = useState(initialExcludedKeys);

    function filterExcludedKeys(entries, excluded) {
        return entries.filter(([key]) => !excluded.includes(key));
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    return (
        <div className="bg-white w-[90%] border-2 border-[#49257b] mb-10 flex flex-col justify-around p-4 shadow-lg" data-name={name}>
            <div className="mb-10 w-full flex items-center gap-5 pl-3 pt-2">
                <div className="bg-[#49257b] rounded-full p-2">
                    <Building2 className="text-yellow-50" size={30}/>
                </div>
                <h2 className="text-lg text-left font-sans">{name}</h2>
            </div>
            <div className="flex cursor-pointer w-fit ml-auto mr-4 pr-5">
                {canEdit && (
                    <Pencil onClick={()=>setAbleToEdit("true")}/>
                )}

            </div>
            <section className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-5 p-4">
                {filterExcludedKeys(Object.entries(data || {}), excludedKeys).map(([key, value], fieldIndex) => (
                    <div key={`${key}`} className="flex flex-col  p-2 mb-5">
                        <label className="text-sm text-gray-400 mb-2 font-normal">{translationMap[key] || key}</label>
                        {ableToEdit ? (
                            <input className="outline-none w-[220px] text-md font-normal border-b-1 border-[#45433e] pb-1" type="text" name={key} value={value  ?? ""} onChange={handleInputChange}/>
                        ): (
                            <p className="w-[220px] text-md font-normal outline-none">
                                {value ?? ""}
                            </p>
                        )}
                    </div>
                ))}
            </section>
            {ableToEdit && (
                <section className="w-full p-2 flex flex-row gap-3 justify-end">
                    <Button className="bg-white text-[#4c1286] cursor-pointer transition-all duration-200 ease-in-out" onClick={()=> setAbleToEdit(false)}>Cancelar</Button>
                    <Button className="bg-[#4c1286] rounded-sm cursor-pointer" onClick={handleSave}>Salvar</Button>
                </section>
            )}
        </div>
    )
}