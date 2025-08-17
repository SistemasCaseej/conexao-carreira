import {Input} from "@/components/ui/input";
import {useState} from "react";

export function LocationInput({value, onChange}) {

    const [location, setLocation] = useState(value || "");

    const handleChange = (e) => {
        const newLocation = e.target.value;
        setLocation(newLocation);
        if (onChange) onChange(newLocation);
    };

    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-lg">Localização da Vaga</h3>
            <span className="text-gray-500 text-sm">
                Informe a cidade da vaga.
            </span>
            <input
                type="text"
                placeholder="Ex: Macaé, Rio das Ostras"
                value={location}
                maxLength={100}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
    );
}