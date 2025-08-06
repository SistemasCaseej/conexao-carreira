'use client'

import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import {Button} from "@/components/ui/button";
import {IconPlus} from "@tabler/icons-react";



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
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Cadastrar Empresa</DialogTitle>
                        <DialogDescription>
                            Inclua a adição da empresa. Clique em salvar quando terminar.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </form>

        </Dialog>
    )
}