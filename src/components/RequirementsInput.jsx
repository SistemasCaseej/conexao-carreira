"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {useEffect, useState} from "react";

export function RequirementsInput({value = [], onChange}) {
    const [inputValue, setInputValue] = useState("");
    const [requirements, setRequirements] = useState(value || []);
    
    const handleAddRequirement = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue) {
            const updated = [...requirements, trimmedValue];
            setRequirements(prev => [...prev, trimmedValue]);
            onChange(updated);
            setInputValue("");
        }
    }

    const handleRemoveRequirement = (index) => {
        const updated = requirements.filter((_, i) => i !== index);
        setRequirements(updated);
        onChange(updated)
    };

    return (
        <div className="mt-5">
            <h3 className="text-lg">Requisitos</h3>
            <span className="mt-2 text-gray-500 text-sm">
                Liste requisitos específicos sobre o talento, a vaga e outros aspectos.
            </span>
            <section className="mt-4">
                <section className="flex flex-row items-center gap-2">
                    <Input
                        type="text"
                        maxLength={100}
                        placeholder="Adicione os requisitos"
                        className="focus:outline-none focus:ring-2 focus:ring-[#49257b]"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                    />
                    <Button onClick={handleAddRequirement} className="cursor-pointer bg-[#49257b]">Inserir</Button>
                </section>
                <section className="border-1 border-gray-200 min-h-30 pl-3 pt-3 pb-3 mt-2">
                    <ul className="list-disc ">
                        {requirements.map((req, index) => (
                            <li key={index} className="list-none">
                                {req}{" "}
                                <button
                                    onClick={() => handleRemoveRequirement(index)}
                                    className="text-red-500 ml-2 cursor-pointer"
                                >
                                    x
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            </section>
        </div>
    )
}
