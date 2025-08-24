import ClientTable from "@/components/ClientTable";
import {getUsersWithCompany} from "@/services/userService";
import {requireAuth} from "@/utils/requireAuth";


export default async function CompanyUsersPage(){

    await requireAuth(["Admin"], "/dashboard");

    const data = await getUsersWithCompany();

    return (
        <section className="flex-1 flex-col gap-2 py-6">
            <section data-qa="teste" className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <ClientTable data={data} actions={true} approve={false} customSection={[{ title : "GERENCIAR USUÁRIOS", addUser: false, addCompanyUser: true }]} />
            </section>
        </section>
    )
}