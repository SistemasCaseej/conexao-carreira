'use client';

import * as React from "react"
import { Button } from "@/components/ui/button"

import { flexRender, getCoreRowModel, useReactTable, getSortedRowModel, getPaginationRowModel} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {IconChevronDown, IconLayoutColumns} from "@tabler/icons-react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useState} from "react";
import {AdminForm} from "@/components/AdminForm";
import {CompanyUserForm} from "@/components/CompanyUserForm";

export function DataTable({ columns, data, customSection}) {
    const [sorting, setSorting] = useState([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting
        }
    });

    return (
        <div className="px-4 lg:px-6">
            {customSection.map((section, index) => (
                <div key={index} className="flex items-center justify-between mb-4">
                    <div>{section.title}</div>
                    <section>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <IconLayoutColumns />
                                    <span className="hidden lg:inline">Selecionar colunas</span>
                                    <span className="lg:hidden">Columns</span>
                                    <IconChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                {table.getAllColumns().filter(
                                    (column) =>
                                        typeof column.accessorFn !== "undefined" &&
                                        column.getCanHide()
                                )
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })}
                                </DropdownMenuContent>
                        </DropdownMenu>
                        {section.addUser && <AdminForm />}
                        {section.addCompanyUser && <CompanyUserForm/>}
                    </section>
                </div>
                ))}
            <div className="border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(
                                            header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    Previous
                </Button>
                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Next
                </Button>
            </div>
        </div>
    );
}
