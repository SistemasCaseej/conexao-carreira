import { useState } from "react";

export default function JobTitleInput({ value, onChange }) {
    const [title, setTitle] = useState(value || "");

    const handleChange = (e) => {
        const newValue = e.target.value;
        setTitle(newValue);
        if (onChange) onChange(newValue);
    };

    return (
        <section className="flex flex-col gap-2">
            <h3 className="text-lg">
                Título da Vaga
            </h3>
            <span className="text-sm text-gray-500">
            Informe um título claro e objetivo para a vaga (máx. 100 caracteres).
            </span>
            <input
                type="text"
                value={title}
                onChange={handleChange}
                maxLength={100}
                placeholder="Ex.: Desenvolvedor Frontend, Analista de QA..."
                className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#49257b]"
            />
        </section>
    );
}
