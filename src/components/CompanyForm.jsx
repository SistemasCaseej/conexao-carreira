'use client'

import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {IconPlus} from "@tabler/icons-react";
import {GenericForm} from "@/components/Form";
import {toast} from "sonner";
import {useRouter} from "next/navigation";



export default function CompanyForm(){

    const router = useRouter();

    const handleSubmit = async (data) => {

        try{
            const response = await fetch('/api/company', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            })

            const responseData = await response.json();

            if(!response.ok) {
                toast.error(responseData.message || "Erro ao enviar formulário.");
            }else {
                toast.error(responseData.message || "Administrador cadastrado com sucesso!");
                setOpen(false);
                router.refresh();
            }
        }catch (error){
            console.error(error)
        }

    };
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="ml-2 border cursor-pointer">
                        <IconPlus />
                        <span className="hidden lg:inline">Adicionar Empresa</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:min-w-[670px]">
                    <DialogHeader>
                        <DialogTitle className="font-semibold text-black">CADASTRAR EMPRESA</DialogTitle>
                    </DialogHeader>
                    <GenericForm
                        fields={[
                            {label: "Razão Social", name: "razão"},
                            {label: "Nome Fantasia", name: "nome"},
                            {label: "CNPJ", name: "cnpj"},
                            {label: "Porte da Empresa", name: "porte"},
                        ]}
                        logo={true}
                        onSubmit={handleSubmit}
                    />
                </DialogContent>
            </form>

        </Dialog>
    )
}