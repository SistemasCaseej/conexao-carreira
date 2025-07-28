import {SectionCards} from "@/components/section-cards";
import {getAllPendingUsers} from "@/services/userService";
import ClientTable from "@/components/ClientTable";


export default async function PageCandidates() {

    const data = await getAllPendingUsers();

    const informations = [
        {
            "title" : "Total de Usuários Pendentes",
            "quantity" : data.length,
        },
        {
            "title" : "Total de Usuários Aprovados",
            "quantity" : 30
        },
        {
            "title" : "Total de Usuários Recusados",
            "quantity" : 40
        }

    ]

    return (
        <div className="flex-1 flex-col gap-2 py-6">
            <section data-qa="teste" className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards informations={informations} />
                <ClientTable data={data}  actions={true} />
            </section>
        </div>
    )
}