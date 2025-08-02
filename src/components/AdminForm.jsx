'use client'

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import {GenericForm} from "@/components/Form";
import {toast} from "sonner";

export function AdminForm() {

    const handleSubmit = async (data) => {

        try{
            const response = await fetch('/api/users/admin', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            })

            console.log(response)
            const responseData = await response.json();

            if(!response.ok) {
                toast.error(responseData.message || "Erro ao enviar formulário.");
            }else {
                toast.error(responseData.message || "Administrador cadastrado com sucesso!");
            }
        }catch (error){
            console.error(error)
        }

    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="ml-2 border">
                    <IconPlus />
                    <span className="hidden lg:inline">Adicionar Usuário</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:min-w-[670px]">
                <DialogTitle className="text-xl font-semibold">
                    Cadastrar Administrador
                </DialogTitle>
              <GenericForm onSubmit={handleSubmit} hiddenFields={["enrollmentProof"]}/>
            </DialogContent>
        </Dialog>
    );
}
