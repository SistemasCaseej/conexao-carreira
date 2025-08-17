"use client"

export function EmploymentType({ value, onChange }) {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className="mt-5">
            <h3 className="text-lg">Tipo de Emprego</h3>
            <span className="mt-2 text-gray-500 text-sm">
                Selecione o tipo de emprego para esta vaga.
            </span>
            <section className="mt-4">
                <select
                    value={value}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2"
                >
                    <option value="">Selecione</option>
                    <option value="Tempo integral">Tempo integral</option>
                    <option value="Meio período">Meio período</option>
                    <option value="Estágio">Estágio</option>
                    <option value="Freelance">Freelance</option>
                </select>
            </section>
        </div>
    );
}
