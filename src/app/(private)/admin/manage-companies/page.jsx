'use client'

import { Label } from "@/components/ui/label"
import { CirclePlus } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import {createCompany} from "@/app/actions/companies/actions";
import {useActionState, useEffect, useState} from "react";
import {toast} from "sonner";
import {Toast} from "radix-ui";

const initialState = {
    success: false,
    message: '',
    data: ''
};


export default function ManageCompanies() {
    const [state, formAction] = useActionState(createCompany, initialState);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        if(state.success){
            toast.success("Company created successfully!");
            setOpen(false);
        }
    }, [state.success])

    return (
        <section className="py-12 px-8">
            <h1 className="text-2xl font-semibold mb-5">Empresas Cadastradas</h1>
            <div className="flex flex-row justify-between items-center">
                <Input type={"text"} placeholder={"Pesquisar"} className="rounded-none"/>
                <Dialog>
                    <DialogTrigger asChild>
                            <CirclePlus className="cursor-pointer"/>
                        </DialogTrigger>
                        <DialogContent className="sm:min-w-[670px]">
                                <form action={formAction}>
                                    <DialogHeader>
                                        <DialogTitle>Cadastrar Empresa</DialogTitle>
                                        <DialogDescription>Inclua a adição da empresa. Clique em salvar quando terminar.</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                                        <div className="grid gap-3">
                                            <Label htmlFor="name">Nome *</Label>
                                            <Input type="text" id="name" name="name" placeholder="CASEEJ" maxLength="50" required />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="cnpj">CNPJ *</Label>
                                            <Input type="text" id="cnpj" name="cnpj" maxLength="20" placeholder="Informe o seu CNPJ" required/>
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="city">Cidade *</Label>
                                            <Input id="city" maxLength="20" name="city" placeholder="Macaé" required/>
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="site">Site</Label>
                                            <Input type="url" id="site" name="site" placeholder="https://example.com" maxLength="70"/>
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="phone">Telefone</Label>
                                            <Input type="tel" id="phone" name="phone" placeholder="(00) 00000-0000" maxLength="20"/>
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="address">Endereço</Label>
                                            <Input type="text" id="address" name="address" placeholder="Rua Exemplo" maxLength="100"/>
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="area">Área de Atuação</Label>
                                            <Input type="text" id="area" name="area" placeholder="Tecnologia" maxLength="50"/>
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="description">Descrição</Label>
                                            <Input type="text" id="description" name="description" maxLength="300" placeholder="Empresa...."></Input>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button className="cursor-pointer" variant="outline">Cancelar</Button>
                                        </DialogClose>
                                        <Button className="cursor-pointer" type="submit">Salvar</Button>
                                    </DialogFooter>
                                </form>
                    </DialogContent>
                </Dialog>
            </div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </section>
    )
}