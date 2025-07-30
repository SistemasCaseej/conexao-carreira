"use client"

import { z } from "zod"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export const paymentSchema = z.object({
    id: z.string(),
    amount: z.number(),
    status: z.enum(["Aprovado", "Recusado", "Pendente"]),
    email: z.string().email(),
})

// Colunas da tabela
export const getColumns = ({ onApprove, onReject, actions, approve }) => {
    return [
        {
            accessorKey: "name",
            header: "Nome",
        },
        {
            accessorKey: "cpf",
            header: "CPF",
        },
        {
            accessorKey: "email",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
        },
        {
            accessorKey: "linkedIn",
            header: "LinkedIn",
        },
        {
            accessorKey: "status",
            header: "Status",
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const user = row.original

                if (!actions) return null;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            {approve && (
                                <DropdownMenuItem onClick={() => onApprove(user.id, user.email)}>
                                    Aprovar
                                </DropdownMenuItem>
                            )}

                            <DropdownMenuItem onClick={() => onReject(user.id)}>
                                Excluir
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]
}
