'use client'

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { withMask } from 'use-mask-input';
import Form from "next/form";


export function GenericForm({ onSubmit, initialData = {}, errors = {}, hiddenFields = []}) {
    const [userData, setUserData] = useState({
        name: initialData.name || '',
        email: initialData.email || '',
        cpf: initialData.cpf || '',
        phoneNumber: initialData.phoneNumber || '',
        linkedIn: initialData.linkedIn || '',
        city: initialData.city || '',
        enrollmentProof: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(userData);
    };

    const renderFieldError = (errors, fieldName) => {
        const error = errors?.[fieldName]?._errors?.[0];
        if (!error) return null;

        return <p className="text-red-500 text-sm mt-1">{error}</p>;
    };

    const renderField = (label, name, type, placeholder, cpfMask, telMask) => {
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
                />
            </div>
        );
    }

    return (
        <Form onSubmit={handleSubmit} className="flex flex-wrap flex-col gap-6 py-4 w-full">
            <div className="flex flex-col">

                <div className="flex flex-row flex-wrap justify-between items-center gap-4">
                    <div className="flex-1 min-w-[280px]">
                        {renderField("Nome", "name", "text", "Digite seu nome")}
                        {renderFieldError(errors, "name")}
                    </div>

                    <div className="flex-1 min-w-[280px]">
                        {renderField("Email", "email", "type", "Digite seu email")}
                        {renderFieldError(errors, "email")}
                    </div>
                </div>

                <div className="flex flex-row flex-wrap justify-between items-center gap-4 mt-4">
                    <div className="flex-1 min-w-[280px]">
                        {renderField("CPF", "cpf", "text", "Informe o seu CPF", true)}
                        {renderFieldError(errors, "cpf")}
                    </div>

                    <div className="flex-1 min-w-[280px]">
                        {renderField("Telefone", "phoneNumber", "tel", "(00) 00000-0000", false, true)}
                        {renderFieldError(errors, "phoneNumber")}
                    </div>

                </div>

                <div className="flex flex-row flex-wrap justify-between items-center gap-4 mt-4">
                    <div className="flex-1 min-w-[280px]">
                        {renderField("LinkedIn", "linkedIn", "text", "https://www.linkedin.com/in/seu-perfil")}
                        {renderFieldError(errors, "linkedIn")}
                    </div>

                    <div className="flex-1 min-w-[280px]">
                        {renderField("Cidade", "city", "text", "Informe a sua cidade")}
                        {renderFieldError(errors, "city")}
                    </div>
                </div>

                <div className="flex flex-row flex-wrap justify-between items-center gap-4 mt-4">
                    <div className="w-[45%]">
                        {renderField("Comprovante de Matrícula", "enrollmentProof", "file")}
                        {renderFieldError(errors, "enrollmentProof")}
                    </div>

                <div className="mt-2 w-full flex justify-end">
                    <Button type="submit" className="cursor-pointer w-[120px]">
                        Cadastrar
                    </Button>
                </div>

            </div>

            </div>
        </Form>
    );
}
