'use client'

import { Label } from "@/components/ui/label"
import { CirclePlus } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { createCompany } from "@/app/actions/companies/actions";


export default function ManageCompanies() {
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
                            <form action={createCompany}>
                            <DialogHeader>
                                <DialogTitle>Cadastrar Empresa</DialogTitle>
                                <DialogDescription>
                                    Inclua a adição da empresa. Clique em salvar quando terminar.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="name-1">Nome *</Label>
                                    <Input type="text" id="name-1" name="name" placeholder="CASEEJ" maxLength="50"/>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="cnpj-1">CNPJ *</Label>
                                    <Input type="text" id="cnpj-1" name="cnpj" maxLength="20" placeholder="Informe o seu CNPJ"/>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="cidade-1">Cidade *</Label>
                                    <Input id="cidade-1" maxLength="20" name="cidade" placeholder="Macaé"/>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="site-1">Site</Label>
                                    <Input type="url" id="site-1" name="site-1" placeholder="https://example.com" maxLength="70"/>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="telefone-1">Telefone</Label>
                                    <Input type="tel" id="telefone-1" name="telefone-1" placeholder="(00) 00000-0000" maxLength="20"/>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="endereco-1">Endereço</Label>
                                    <Input type="text" id="endereco-1" name="endereco-1" placeholder="Rua Exemplo" maxLength="100"/>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="area-1">Área de Atuação</Label>
                                    <Input type="text" id="area-1" name="area-1" placeholder="Tecnologia" maxLength="50"/>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="area-1">Descrição</Label>
                                    <textarea className="border border-gray-300 rounded p-2 w-full" maxLength="150"></textarea>
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