import ClientTable from "@/components/ClientTable";
import {getAllApprovedUsers} from "@/services/userService";

export default async function PageUsersAdmins() {

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
                <ClientTable data={data} actions={true} approve={false} customSection={[{ title : "USUÁRIOS ADMINISTRADORES", addUser: true }]}/>
            </section>
        </div>
    )
}