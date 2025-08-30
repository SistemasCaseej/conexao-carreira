"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import Form from "next/form";
import {useState} from "react";
import {withMask} from "use-mask-input";
import {toast} from "sonner";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "@/firebase/config";

export function RegisterForm() {

    const [enrollmentFile, setEnrollmentFile] = useState(null);
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

    const showError = (msg) => {
        toast.error(msg, {
            style: {
                border: "1px solid #ef4444",
                padding: "16px",
                color: "#fff",
                background: "#dc2626",
            },
            iconTheme: { primary: "#dc2626", secondary: "#fff" },
        })
    }

    const showSuccess = (msg) => {
        toast.success(msg, {
            duration: 30000,
            style: {
                border: "1px solid #22c55e",
                padding: "16px",
                color: "#fff",
                background: "#16a34a",
            },
            iconTheme: { primary: "#16a34a", secondary: "#fff" },
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (!enrollmentFile) {
            showError("Selecione um arquivo de comprovante de matrícula antes de enviar.")
            return
        }

        const maxSize = 5 * 1024 * 1024 // 5MB
        if (enrollmentFile.size > maxSize) {
            showError("Arquivo muito grande! O tamanho máximo permitido é 5MB.")
            return
        }

        const validTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"]
        if (!validTypes.includes(enrollmentFile.type)) {
            showError("Formato inválido! Envie apenas PDF, JPG ou PNG.")
            return
        }

        try {
            // 1️⃣ Criar usuário pendente
            const res = await fetch("/api/users/pending", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            })
            const data = await res.json()

            if (!res.ok) {
                if (data.errors) {
                    Object.entries(data.errors).forEach(([_, errorObj]) => {
                        if (errorObj._errors?.length > 0) showError(errorObj._errors[0])
                    })
                    return
                }
                showError(data.message || "Erro ao enviar formulário.")
                return
            }

            // 2️⃣ Upload do arquivo
            const storageRef = ref(storage, `enrollmentProofs/${data.data.userId}-${enrollmentFile.name}`)
            await uploadBytes(storageRef, enrollmentFile)
            const fileURL = await getDownloadURL(storageRef)

            // 3️⃣ Atualizar usuário com URL do arquivo
            await fetch(`/api/users/pending/${data.data.userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ enrollmentProof: fileURL }),
            })

            showSuccess("Cadastro enviado com sucesso! Sua candidatura está sendo avaliada. Verifique seu email em alguns dias.")
            setUserData({ name: "", email: "", cpf: "", phoneNumber: "", linkedIn: "", city: "" })
            setEnrollmentFile(null)
        } catch (err) {
            console.error(err)
            showError("Ocorreu um erro ao enviar o formulário. Tente novamente.")
        }
    }

    return(
        <section>
            <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-center text-[#4c1286]">Crie a sua conta</h1>
                <p className="text-black-500 text-sm text-balance">Preencha as informações abaixo para a realização do cadastro</p>
            </div>

            <Form onSubmit={handleSubmit} className="flex flex-wrap flex-col gap-6 px-6 py-4 w-full mt-10">
                <div className="flex flex-col">
                    <div className="flex flex-row flex-wrap justify-between items-center gap-2">
                        <div className="flex-1 min-w-[280px]">
                            <Label htmlFor="name">Nome</Label>
                            <Input id="name" maxLength={40}  type="text" name="name" className="mt-2 rounded-sm" value={userData.name} onChange={handleChange} placeholder="Digite seu nome completo"/>
                        </div>
                        <div className="flex-1 min-w-[280px]">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" maxLength={80} type="email" name="email" className="mt-2 rounded-sm" value={userData.email} onChange={handleChange} placeholder="Digite seu email"/>
                        </div>
                    </div>
                    <div className="flex flex-row flex-wrap justify-between items-center gap-2 mt-4">
                        <div className="flex-1 min-w-[280px]">
                            <Label htmlFor="cpf">CPF</Label>
                            <Input ref={withMask('cpf')} id="cpf" type="text" name="cpf" className="mt-2 rounded-sm" value={userData.cpf} onChange={handleChange} placeholder="Informe o seu CPF"/>
                        </div>
                        <div className="flex-1 min-w-[280px]">
                            <Label htmlFor="phoneNumber">Telefone</Label>
                            <Input id="phoneNumber" ref={withMask('(99) 99999-9999')}  maxLength={20} type="tel" name="phoneNumber" className="mt-2 rounded-sm" value={userData.phoneNumber} onChange={handleChange} placeholder="(00) 00000-0000"/>
                        </div>
                    </div>
                    <div className="flex flex-row flex-wrap justify-between items-center gap-2 mt-4">
                        <div className="flex-1 min-w-[280px]">
                            <Label htmlFor="linkedIn">LinkedIn</Label>
                            <Input id="linkedIn" type="text" name="linkedIn" className="mt-2 rounded-sm" value={userData.linkedIn} onChange={handleChange} placeholder="https://www.linkedin.com/company/case-empresa-j%C3%BAnior/" />
                        </div>
                        <div className="flex-1 min-w-[280px]">
                            <Label htmlFor="city">Cidade</Label>
                            <Input id="city" type="text" name="city" maxLength={30} className="mt-2 rounded-sm" value={userData.city} onChange={handleChange} placeholder="Informe a sua cidade"/>
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
                                onChange={(e) => setEnrollmentFile(e.target.files[0])}
                                accept=".pdf,.jpg,.jpeg,.png"
                                className="mt-2 rounded-sm border border-gray-300 shadow-sm
                                     file:mr-4 file:py-2 file:px-4
                                     file:border-0
                                     file:rounded
                                     file:bg-[#4c1286] file:text-white
                                     file:text-sm file:font-medium
                                     file:leading-tight
                                     hover:file:bg-[#4c1286] cursor-pointer"

                            />

                        </div>
                    </div>
                    <div className="mt-4 w-full flex justify-end">
                        <Button type="submit" className="rounded-sm cursor-pointer w-[120px] bg-[#4c1286]">Cadastrar</Button>
                    </div>
                </div>
            </Form>
            <div className="text-center text-sm mt-4"> Já possui uma conta?
                <Link href="/login" className="ml-2 text-left hover:text-[#4c1286]">Faça seu Login</Link>
            </div>

        </section>
    )
}
