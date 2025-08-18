"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function JobBenefits({ value = [], onChange }) {
    const [inputValue, setInputValue] = useState("");
    const [benefits, setBenefits] = useState(value || []);

    const handleAddBenefit = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue) {
            const newBenefits = [...benefits, trimmedValue];
            setBenefits(newBenefits);
            onChange(newBenefits);
            setInputValue("");

        }
    };

    const handleRemoveBenefits = (index) => {
        const updated = benefits.filter((_, i) => i !== index);
        setBenefits(updated);
        onChange(updated)
    };

    return (
        <div className="mt-5">
            <h3 className="text-lg">Benefícios</h3>
            <span className="mt-2 text-gray-500 text-sm">
                Liste os benefícios oferecidos pela vaga, como plano de saúde, vale-alimentação, etc.
            </span>
            <section className="mt-4">
                <section className="flex flex-row items-center gap-2">
                    <Input
                        type="text"
                        placeholder="Adicionar benefício"
                        className="focus:outline-none focus:ring-2 focus:ring-[#49257b]"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button className="cursor-pointer bg-[#49257b]"  onClick={handleAddBenefit}>Inserir</Button>
                </section>
                <section className="border border-gray-200 min-h-30 pl-3 pt-3 pb-3 mt-2">
                    <ul className="list-disc">
                        {benefits.map((benefit, index) => (
                            <li key={index} className="list-none">
                                {benefit}{" "}
                                <button
                                    onClick={() => handleRemoveBenefits(index)}
                                    className="text-red-500 ml-2 cursor-pointer">
                                    x
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            </section>
        </div>
    );
}
