import {useEffect, useState} from "react";
import { Label } from '@/components/ui/label';


export default function DropdownCompanies(){

    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState("");


    const handleChange = (e) => {
        setSelected(e.target.value);
    };

    useEffect(() => {

        async function getAllCompanies() {
            try{
                const response = await fetch("/api/company", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                const data = await response.json();

                if(response.ok) {
                    setOptions(data);
                }

                console.log(data)

            }catch(err){
                console.error("Erro ao carregar as empresas", error)
            }
        }

       getAllCompanies()
    }, [])

    return (
        <div className="w-3xl items-start">
            <Label className="font-normal">Empresas</Label>
            <select
                name="companies"
                id="companies"
                value={selected}
                className="mt-2 p-2 border border-gray-200 w-[80%]"
                required={true}
                onChange={handleChange}
            >
                <option value="" disabled className="font-normal">{"Selecione..."}</option>
                {options.map(opt => (
                    <option key={opt} value={opt}>{opt.tradeName}</option>
                ))}
            </select>
        </div>
    )
}