'use client'

import {useRef, useState} from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { withMask } from 'use-mask-input';
import Form from "next/form";
import Image from 'next/image';
import { Upload } from "lucide-react"



export function GenericForm({ onSubmit, fields = [], initialData = {}, errors = {}, hiddenFields = [], logo}) {

    const [preview, setPreview] = useState(false);
    const fileInputRef = useRef(null);


    const buildInitialState = (initialData = {}) => {
        const result = {};
        fields.forEach((field) => {
            result[field.name] = initialData[field.name] ?? (field.type === "file" ? null : "");
        });
        return result;
    }

    const [userData, setUserData] = useState(() => buildInitialState(fields, initialData));

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(userData);

        const resetData = buildInitialState({})
        setUserData(resetData);
    };

    const renderFieldError = (errors, fieldName) => {
        const error = errors?.[fieldName]?._errors?.[0];
        if (!error) return null;

        return <p className="text-red-500 text-sm mt-1">{error}</p>;
    };

    const renderField = ({label, name, type, placeholder, cpfMask, telMask, maxLength, required, cnpjMask}) => {
        if (hiddenFields.includes(name)) return null;

        let inputRef = null;
        if (cpfMask && name === "cpf") inputRef = withMask("cpf");
        if (telMask && name === "phoneNumber") inputRef = withMask("(99) 99999-9999");
        if (cnpjMask && name === "cnpj") inputRef = withMask("99.999.999/9999-99")

        return (
            <div key={name} className="flex-1 min-w-[280px]">
                <Label className="font-normal" htmlFor={name}>{label}</Label>
                <Input
                    ref={inputRef}
                    type={type}
                    name={name}
                    id={name}
                    value={userData[name] || ""}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="mt-2"
                    maxLength={maxLength}
                    required={required}
                />
                {renderFieldError(name)}
            </div>
        );
    }

    return (
        <Form onSubmit={handleSubmit} className="flex flex-wrap flex-col">
            <section className="flex flex-row flex-wrap">
                {logo && (
                    <div className="flex-[3] bg-[#f7f7f9] flex flex-col items-center justify-start gap-4">
                        <h3 className="mt-10">CADASTRAR EMPRESA</h3>
                        <div className="bg-white w-[80%] flex flex-col justify-center items-center gap-10 p-7">
                            {preview ? (
                                <Image src={preview} width={150} height={150} alt="Logo preview" className="rounded-md w-[150px] h-[150px] bg-[#f7f7f9] object-fit"/>
                            ):(
                                <Upload height={150} width={150} className="border-1 border-[#ffffff] rounded-lg bg-[#f7f7f9] p-4"/>
                                )}

                            <Button type="button" onClick={handleImageClick} className="cursor-pointer" size={"lg"}>Adicionar logo</Button>
                            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} style={{ display: "none" }}
                            />
                        </div>
                    </div>
                )}
                <div className={`${logo ? "flex flex-[4] flex-col p-10" : "flex flex-col p-10"} `}>
                    <div className="flex flex-wrap gap-6">
                        {fields.map(renderField)}
                    </div>
                    <div className="mt-20 gap-5 w-full flex items-end justify-end">
                        <Button type="button" className="cursor-pointer w-[120px]">
                            Cancelar
                        </Button>
                        <Button type="submit" className="cursor-pointer w-[120px]">
                            Cadastrar
                        </Button>
                    </div>
                </div>
            </section>
        </Form>
    );
}
