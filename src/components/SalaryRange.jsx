import {useEffect, useState} from "react";

export default function SalaryInput({ value = { minSalary: "", maxSalary: "", notInformed: false }, onChange }) {
    const [minSalary, setMinSalary] = useState(value.minSalary);
    const [maxSalary, setMaxSalary] = useState(value.maxSalary);
    const [notInformed, setNotInformed] = useState(value.notInformed);

    const formatCurrency = (val) => {
        if (!val) return "";
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
        }).format(val / 100);
    };

    const handleMinChange = (e) => {
        const newMin = e.target.value.replace(/\D/g, "");
        setMinSalary(newMin);

        if(onChange){
            onChange({
                minSalary: newMin,
                maxSalary,
                notInformed: false,
            })
        }
    }
    const handleMaxChange = (e) => {

        const newMax = e.target.value.replace(/\D/g, "");
        setMaxSalary(newMax);

        if(onChange){
            onChange({
                minSalary,
                maxSalary: newMax,
                notInformed: false,
            })
        }
    }
    const handleNotInformedChange = (e) => {
        setNotInformed(e.target.checked);
        onChange({notInformed: false});
        if (e.target.checked) {
            onChange({notInformed: true})
            setMinSalary("");
            setMaxSalary("");
        }
    };

    return (
        <div className="flex flex-col gap-3 mt-5">
            <label className="text-lg">Faixa Salarial</label>

            <span className="mt-2 text-gray-500 text-sm">
            Informe o salário mínimo e máximo da vaga ou marque "Não informado&#34;.
            </span>

            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={notInformed}
                    onChange={handleNotInformedChange}
                    className="cursor-pointer"
                />
                Não informado
            </label>
            <section className="mt-2 flex gap-2 items-center">
                <input
                    type="text"
                    value={minSalary ? formatCurrency(minSalary) : ""}
                    onChange={handleMinChange}
                    disabled={notInformed}
                    placeholder="Salário mínimo"
                    className="border rounded p-2 w-full disabled:bg-gray-100"
                />

                <input
                    type="text"
                    value={maxSalary ? formatCurrency(maxSalary) : ""}
                    onChange={handleMaxChange}
                    disabled={notInformed}
                    placeholder="Salário máximo"
                    className="border rounded p-2 w-full disabled:bg-gray-100"
                />
            </section>

        </div>
    );
}
