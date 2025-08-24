import ClientTable from "@/components/ClientTable";
import {getAllApprovedUsers} from "@/services/userService";
import {requireAuth} from "@/utils/requireAuth";

export default async function PageUsers() {

    await requireAuth(["Admin"], "/dashboard");

    const data = await getAllApprovedUsers();

    return (
        <div className="flex-1 flex-col gap-2 py-6">
            <section data-qa="teste" className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <ClientTable data={data} actions={true} approve={false} customSection={[{title : "USUÁRIOS APROVADOS", addUser: false}]}/>
            </section>
        </div>
    )
}