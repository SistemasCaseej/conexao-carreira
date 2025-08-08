'use client'

import {useRef, useState} from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { withMask } from 'use-mask-input';
import Form from "next/form";
import Image from 'next/image'



export function GenericForm({ onSubmit, fields = [], initialData = {}, errors = {}, hiddenFields = [], logo}) {

    const [preview, setPreview] = useState(true);
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

    const renderField = ({label, name, type, placeholder, cpfMask, telMask, maxLength, required}) => {
        if (hiddenFields.includes(name)) return null;

        let inputRef = null;
        if (cpfMask && name === "cpf") inputRef = withMask("cpf");
        if (telMask && name === "phoneNumber") inputRef = withMask("(99) 99999-9999");

        return (
            <div key={name} className="flex-1 min-w-[280px]">
                <Label htmlFor={name}>{label}</Label>
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
        <Form onSubmit={handleSubmit} className="flex flex-wrap flex-col gap-6 py-4 w-full">
            <section className="flex flex-row mt-5">
                {logo && (
                    <div className="flex-[2]">
                        {preview && (
                            <Image onClick={handleImageClick} src={"/jose.jpg" || preview} alt="Logo" height="100" width="150" className="rounded-full border-2 border-purple-700 mb-10 cursor-pointer"/>
                        )}
                        <Input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden"/>
                    </div>
                )}
                <div className="flex flex-[4] flex-col">
                    <div className="flex flex-wrap gap-4">
                        {fields.map(renderField)}
                    </div>
                    <div className="mt-2 w-full flex justify-end">
                        <Button type="submit" className="cursor-pointer w-[120px]">
                            Cadastrar
                        </Button>
                    </div>
                </div>
            </section>
        </Form>
    );
}
