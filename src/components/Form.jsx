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

    return (
        <Form onSubmit={handleSubmit} className="flex flex-wrap flex-col gap-6 py-4 w-full">
            <div className="flex flex-col">

                <div className="flex flex-row flex-wrap justify-between items-center gap-4">
                    {!hiddenFields.includes("name") && (
                        <div className="flex-1 min-w-[280px]">
                            <Label htmlFor="name">Nome</Label>
                            <Input
                                id="name"
                                maxLength={40}
                                type="text"
                                name="name"
                                className="mt-2"
                                value={userData.name}
                                onChange={handleChange}
                                placeholder="Digite seu nome completo"
                                required
                            />
                            {errors?.name?._errors && (
                                <p className="text-red-500 text-sm mt-1 font-semibold">{errors.name._errors[0]}</p>
                            )}
                        </div>
                    )}

                    {!hiddenFields.includes("email") && (
                        <div className="flex-1 min-w-[280px]">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                maxLength={80}
                                type="email"
                                name="email"
                                className="mt-2"
                                value={userData.email}
                                onChange={handleChange}
                                placeholder="Digite seu email"
                                required
                            />
                            {errors?.email?._errors && (
                                <p className="text-red-500 text-sm mt-1">{errors.email._errors[0]}</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex flex-row flex-wrap justify-between items-center gap-4 mt-4">
                    {!hiddenFields.includes("cpf") && (
                        <div className="flex-1 min-w-[280px]">
                            <Label htmlFor="cpf">CPF</Label>
                            <Input
                                ref={withMask('cpf')}
                                id="cpf"
                                type="text"
                                name="cpf"
                                className="mt-2"
                                value={userData.cpf}
                                onChange={handleChange}
                                placeholder="Informe o seu CPF"
                                required
                            />
                            {errors?.cpf?._errors && (
                                <p className="text-red-500 text-sm mt-1">{errors.cpf._errors[0]}</p>
                            )}
                        </div>
                    )}

                    {!hiddenFields.includes("phoneNumber") && (
                        <div className="flex-1 min-w-[280px]">
                            <Label htmlFor="phoneNumber">Telefone</Label>
                            <Input
                                id="phoneNumber"
                                ref={withMask('(99) 99999-9999')}
                                maxLength={20}
                                type="tel"
                                name="phoneNumber"
                                className="mt-2"
                                value={userData.phoneNumber}
                                onChange={handleChange}
                                placeholder="(00) 00000-0000"
                                required
                            />
                            {errors?.phoneNumber?._errors && (
                                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber._errors[0]}</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex flex-row flex-wrap justify-between items-center gap-4 mt-4">
                    {!hiddenFields.includes("linkedIn") && (
                        <div className="flex-1 min-w-[280px]">
                            <Label htmlFor="linkedIn">LinkedIn</Label>
                            <Input
                                id="linkedIn"
                                type="text"
                                name="linkedIn"
                                className="mt-2"
                                value={userData.linkedIn}
                                onChange={handleChange}
                                placeholder="https://www.linkedin.com/in/seu-perfil"
                            />
                            {errors?.linkedIn?._errors && (
                                <p className="text-red-500 text-sm mt-1">{errors.linkedIn._errors[0]}</p>
                            )}
                        </div>
                    )}

                    {!hiddenFields.includes("city") && (
                        <div className="flex-1 min-w-[280px]">
                            <Label htmlFor="city">Cidade</Label>
                            <Input
                                id="city"
                                type="text"
                                name="city"
                                maxLength={30}
                                className="mt-2"
                                value={userData.city}
                                onChange={handleChange}
                                placeholder="Informe a sua cidade"
                                required
                            />
                            {errors?.city?._errors && (
                                <p className="text-red-500 text-sm mt-1">{errors.city._errors[0]}</p>
                            )}
                        </div>
                    )}
                </div>

                {!hiddenFields.includes("enrollmentProof") && (
                    <div className="flex flex-row flex-wrap justify-between items-center gap-4 mt-4">
                        <div className="w-[45%]">
                            <Label htmlFor="enrollmentProof">Comprovante de Matrícula</Label>
                            <Input
                                id="enrollmentProof"
                                name="enrollmentProof"
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={handleChange}
                                className="mt-2 border border-gray-300 shadow-sm
                                   file:mr-4 file:py-2 file:px-4
                                  file:border-0
                                  file:bg-blue-600 file:text-white
                                  file:text-sm file:font-medium
                                  file:leading-tight
                                  hover:file:bg-blue-700"
                            />
                        </div>
                    </div>
                )}

                <div className="mt-4 w-full flex justify-end">
                    <Button type="submit" className="cursor-pointer w-[120px]">
                        Cadastrar
                    </Button>
                </div>

            </div>
        </Form>
    );
}
