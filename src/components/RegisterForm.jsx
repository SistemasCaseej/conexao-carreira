'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import Form from "next/form";
import {useState} from "react";
import {withMask} from "use-mask-input";
import {toast} from "sonner";

export function RegisterForm() {

    const [formErrors, setFormErrors] = useState({});
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        cpf: "",
        phoneNumber: "",
        linkedIn: "",
        city: "",
    })

    function handleChange(e) {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await fetch("/api/users/pending", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            })

            const responseData = await res.json();

            if(!res.ok) {
                setFormErrors(responseData.errors);
                toast.error(responseData.message || "Erro ao enviar formulário.");

                setTimeout(() => {
                    setFormErrors({});
                }, 5000);
            }else {
                setUserData({
                    name: "",
                    email: "",
                    cpf: "",
                    phoneNumber: "",
                    linkedIn: "",
                    city: "",
                });
            }

        } catch (err) {
            console.error(err)
        }
    }

    return(
        <section>
            <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-center">Crie a sua conta</h1>
                <p className="text-gray-500 text-sm text-balance dark:text-gray-400">Preencha as informações abaixo para a realização do cadastro</p>
            </div>

            <Form onSubmit={handleSubmit} className="flex flex-wrap flex-col gap-6 border-1 px-6 py-4 w-full mt-10">
                <div className="flex flex-col">
                    <div className="flex flex-row flex-wrap justify-between items-center gap-2">
                        <div className="flex-1 min-w-[280px]">
                            <Label htmlFor="name">Nome</Label>
                            <Input id="name" maxLength={40}  type="text" name="name" className="mt-2 rounded-sm" value={userData.name} onChange={handleChange} placeholder="Digite seu nome completo" required />
                            {formErrors?.name?._errors && (
                                <p className="text-red-500 text-sm mt-1 font-semibold">{formErrors.name._errors[0]}</p>
                            )}
                        </div>
                        <div className="flex-1 min-w-[280px]">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" maxLength={80} type="email" name="email" className="mt-2 rounded-sm" value={userData.email} onChange={handleChange} placeholder="Digite seu email" required />
                            {formErrors?.email?._errors && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.email._errors[0]}</p>

                            )}
                        </div>
                    </div>
                    <div className="flex flex-row flex-wrap justify-between items-center gap-2 mt-4">
                        <div className="flex-1 min-w-[280px]">
                            <Label htmlFor="cpf">CPF</Label>
                            <Input ref={withMask('cpf')} id="cpf" type="text" name="cpf" className="mt-2 rounded-sm" value={userData.cpf} onChange={handleChange} placeholder="Informe o seu CPF" required />
                            {formErrors?.cpf?._errors && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.cpf._errors[0]}</p>

                            )}
                        </div>
                        <div className="flex-1 min-w-[280px]">
                            <Label htmlFor="phoneNumber">Telefone</Label>
                            <Input id="phoneNumber" ref={withMask('(99) 99999-9999')}  maxLength={20} type="tel" name="phoneNumber" className="mt-2 rounded-sm" value={userData.phoneNumber} onChange={handleChange} placeholder="(00) 00000-0000" required />
                            {formErrors?.phoneNumber?._errors && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.phoneNumber._errors[0]}</p>

                            )}
                        </div>
                    </div>
                    <div className="flex flex-row flex-wrap justify-between items-center gap-2 mt-4">
                        <div className="flex-1 min-w-[280px]">
                            <Label htmlFor="linkedIn">LinkedIn</Label>
                            <Input id="linkedIn" type="text" name="linkedIn" className="mt-2 rounded-sm" value={userData.linkedIn} onChange={handleChange} placeholder="https://www.linkedin.com/company/case-empresa-j%C3%BAnior/" />
                            {formErrors?.linkedIn?._errors && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.linkedIn._errors[0]}</p>

                            )}
                        </div>
                        <div className="flex-1 min-w-[280px]">
                            <Label htmlFor="city">Cidade</Label>
                            <Input id="city" type="text" name="city" maxLength={30} className="mt-2 rounded-sm" value={userData.city} onChange={handleChange} placeholder="Informe a sua cidade" required />
                            {formErrors?.city?._errors && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.city._errors[0]}</p>

                            )}
                        </div>
                    </div>
                    <div className="flex flex-row flex-wrap justify-between items-center gap-2 mt-4">
                        <div className="w-[45%]">
                            <Label htmlFor="enrollmentProof" className="block text-sm font-medium text-gray-700">
                                Comprovante de Matrícula
                            </Label>
                            <Input
                                id="enrollmentProof"
                                name="enrollmentProof"
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                className="mt-2 rounded-sm border border-gray-300 shadow-sm
                                     file:mr-4 file:py-2 file:px-4
                                     file:border-0
                                     file:rounded
                                     file:bg-blue-600 file:text-white
                                     file:text-sm file:font-medium
                                     file:leading-tight
                                     hover:file:bg-blue-700"
                            />

                        </div>
                    </div>
                    <div className="mt-4 w-full flex justify-end">
                        <Button type="submit" className="rounded-sm cursor-pointer w-[120px]">Cadastrar</Button>
                    </div>
                </div>
            </Form>
            <div className="text-center text-sm mt-4"> Já possui uma conta?
                <Link href="/candidate-login" className="underline underline-offset-4 ml-2 text-left">Faça seu Login</Link>
            </div>

        </section>
    )
}
