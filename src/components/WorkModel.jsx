

export function WorkModel({ value, onChange }){

    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className="mt-5">
            <h3 className="text-lg">Modelo de Trabalho</h3>
            <span className="mt-2 text-gray-500 text-sm">
                Selecione o modelo de trabalho para esta vaga.
            </span>
            <section className="mt-4">
                <select
                    value={value}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2"
                >
                    <option value="">Selecione</option>
                    <option value="Home office">Home office</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Híbrido">Híbrido</option>
                </select>
            </section>
        </div>
    )
}