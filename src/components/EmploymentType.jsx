"use client"

export function EmploymentType({ value, onChange }) {

    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className="mt-5">
            <h3 className="text-lg">Tipo de Contratação</h3>
            <span className="mt-2 text-gray-500 text-sm">
                Selecione o tipo de contratação para esta vaga.
            </span>
            <section className="mt-4">
                <select
                    value={value}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2"
                >
                    <option value="">Selecione</option>
                    <option value="CLT">CLT</option>
                    <option value="Jovem Aprendiz">Jovem Aprendiz</option>
                    <option value="Estágio">Estágio</option>
                    <option value="PJ">PJ</option>
                </select>
            </section>
        </div>
    );
}
