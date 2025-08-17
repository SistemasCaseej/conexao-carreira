"use client"

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function JobDescription({ value, onChange }) {
    const [description, setDescription] = useState(value || "");

    const handleChange = (e) => {
        const newDescription = e.target.value;
        setDescription(newDescription);
        if (onChange) onChange(newDescription);
    };

    return (
        <div className="mt-5">
            <h3 className="text-lg">Descrição da Vaga</h3>
            <span className="mt-2 text-gray-500 text-sm">
                Adicione detalhes importantes sobre a vaga, responsabilidades e expectativas.
            </span>
            <section className="mt-4">
                <Textarea
                    placeholder="Escreva a descrição da vaga aqui..."
                    value={description}
                    onChange={handleChange}
                    rows={6}
                />
            </section>
        </div>
    );
}
