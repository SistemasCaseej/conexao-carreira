'use client'

import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import {Button} from "@/components/ui/button";
import {IconPlus} from "@tabler/icons-react";
import {GenericForm} from "@/components/Form";



export default function CompanyForm(){

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="ml-2 border">
                        <IconPlus />
                        <span className="hidden lg:inline">Adicionar Usuário</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:min-w-[670px]">
                    <DialogHeader>
                        <DialogTitle>Cadastrar Empresa</DialogTitle>
                        <DialogDescription className="">
                            Inclua a adição da empresa. Clique em salvar quando terminar.
                        </DialogDescription>
                    </DialogHeader>
                    <GenericForm
                        fields={[
                            {label: "Razão Social", name: "razão"},
                            {label: "Nome Fantasia", name: "nome"},
                            {label: "CNPJ", name: "cnpj"},
                            {label: "Porte da Empresa", name: "porte"},
                            {label: "Ramo de Atuação", name: "ramo"},
                            {label: "WebSite", name: "site"},
                            {label: "Cidade", name: "city"},
                        ]}
                    />
                </DialogContent>
            </form>

        </Dialog>
    )
}