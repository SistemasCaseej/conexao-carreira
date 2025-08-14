'use client'

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import {GenericForm} from "@/components/Form";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {useState} from "react";

export function AdminForm() {

    const router = useRouter();
    const [open, setOpen] = useState(false);

    const handleSubmit = async (data) => {

        try{
            const response = await fetch('/api/users/admin', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            })

            const responseData = await response.json();

            if(!response.ok) {
                toast.error(responseData.message || "Erro ao enviar formulário.");
            }else {
                toast.success(responseData.message || "Administrador cadastrado com sucesso!");
                setOpen(false);
                router.refresh();
            }
        }catch (error){
            console.error(error)
        }

    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="ml-2 border">
                    <IconPlus />
                    <span className="hidden lg:inline">Adicionar Usuário</span>
                </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="sm:min-w-[900px] p-0 flex flex-row flex-wrap">
                <DialogTitle className="text-xl font-semibold uppercase     text-black pr-10 pt-8 pl-10">
                    Cadastrar Administrador
                </DialogTitle>
              <GenericForm
                  fields={[
                      {label: "Nome", name: "name", type: "text", required: true, placeholder: "Digite seu nome", maxLength: 40},
                      {label: "Email", name: "email", type: "email", required: true, placeholder: "Digite seu e-mail", maxLength: 50},
                      {label: "CPF", name: "cpf", type: "text", cpfMask: true, placeholder: "Informe o seu CPF"},
                      { label: "Telefone", name: "phoneNumber", type: "tel", telMask: true, placeholder: "(00) 00000-0000"},
                      { label: "LinkedIn", name: "linkedIn", type: "text", placeholder: "https://www.linkedin.com/in/seu-perfil", maxLength: 100},
                      { label: "Cidade", name: "city", type: "text", placeholder: "Informe a sua cidade", maxLength: 30},
                  ]}
                  logo={false}
                  onSubmit={handleSubmit}
                  hiddenFields={["enrollmentProof"]}/>
            </DialogContent>
        </Dialog>
    );
}
