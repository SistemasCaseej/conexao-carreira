'use client'

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import {GenericForm} from "@/components/Form";

export function AdminForm() {

    const handleSubmit = () => {
        console.log("Pagina de admin form");
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
