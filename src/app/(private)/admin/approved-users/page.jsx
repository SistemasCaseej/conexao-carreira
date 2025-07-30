import {SectionCards} from "@/components/section-cards";
import ClientTable from "@/components/ClientTable";
import {getAllApprovedUsers} from "@/services/userService";

export default async function PageUsers() {

    const data = await getAllApprovedUsers();

    const informations = [
        {
            "title" : "Total de Usuários",
            "quantity" : data.length,
        },
        {
            "title" : "Total de Novos Usuários",
            "quantity" : 30
        },
    ]
    return (
        <div className="flex-1 flex-col gap-2 py-6">
            <section data-qa="teste" className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards informations={informations} />
                <ClientTable data={data} actions={true} approve={false}/>
            </section>
        </div>
    )
}