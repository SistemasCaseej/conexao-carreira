import { SectionCards } from "@/components/section-cards";
import { getAllPendingUsers } from "@/services/userService";
import ClientTable from "@/components/ClientTable";


export default async function PageCandidates() {

    const data = await getAllPendingUsers();

    return (
        <div className="flex-1 flex-col gap-2 py-6">
            <section data-qa="teste" className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <ClientTable data={data}  actions={true} approve={true} customSection={[{title : "USUÁRIOS PENDENTES", addUser: false}]}/>
            </section>
        </div>
    )
}