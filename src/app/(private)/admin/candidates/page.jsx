import {DataTable} from "@/app/(private)/admin/candidates/data-table";
import { columns} from "@/app/(private)/admin/candidates/columns";
import {SectionCards} from "@/components/section-cards";


async function getData() {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            nome: "José Vitor Façanha da Silva",
            status: "Pending",
            email: "m@example.com",
            cpf: "127.851-287-31",
        },
        {
            id: "728ed52f",
            nome: "José Vitor Façanha da Silva",
            status: "Pending",
            email: "m@example.com",
            cpf: "127.851-287-31",
        },
        {
            id: "728ed52f",
            nome: "José Vitor Façanha da Silva",
            status: "Pending",
            email: "m@example.com",
            cpf: "127.851-287-31",
        },
        {
            id: "728ed52f",
            nome: "José Vitor Façanha da Silva",
            status: "Pending",
            email: "m@example.com",
            cpf: "127.851-287-31",
        },
        {
            id: "728ed52f",
            nome: "José Vitor Façanha da Silva",
            status: "Pending",
            email: "m@example.com",
            cpf: "127.851-287-31",
        },
        {
            id: "728ed52f",
            nome: "José Vitor Façanha da Silva",
            status: "Pending",
            email: "m@example.com",
            cpf: "127.851-287-31",
        },
        {
            id: "728ed52f",
            nome: "José Vitor Façanha da Silva",
            status: "Pending",
            email: "m@example.com",
            cpf: "127.851-287-31",
        },
        {
            id: "728ed52f",
            nome: "José Vitor Façanha da Silva",
            status: "Pending",
            email: "m@example.com",
            cpf: "127.851-287-31",
        },
        {
            id: "728ed52f",
            nome: "José Vitor Façanha da Silva",
            status: "Pending",
            email: "m@example.com",
            cpf: "127.851-287-31",
        },
        {
            id: "728ed52f",
            nome: "José Vitor Façanha da Silva",
            status: "Pending",
            email: "a@example.com",
            cpf: "127.851-287-31",
        },
        {
            id: "728ed52f",
            nome: "José Vitor Façanha da Silva",
            status: "Pending",
            email: "b@example.com",
            cpf: "127.851-287-31",
        },
        // ...
    ]
}


export default async function PageCandidates() {

    const data = await getData()

    return (
        <div className="flex-1 flex-col gap-2">
            <section data-qa="teste" className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards/>
                <DataTable columns={columns} data={data}  />
            </section>
        </div>
    )
}