import ClientTable from "@/components/ClientTable.jsx";
import {requireAuth} from "@/utils/requireAuth.js";
import {getApplicationsByJobIdService} from "@/services/applicationService.js";
import ApplicationTable from "@/components/ApplicationTable.jsx";


export default async function PageCandidatesByApplication({params}) {

    await requireAuth(["Admin", "Employee"], "/dashboard");

    const {id} = await params;

    const data = await getApplicationsByJobIdService(id);

    return (
        <section className="flex-1 flex-col gap-2 py-6">
            <section data-qa="teste" className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <ApplicationTable data={data} actions={false} approve={false} customSection={[{title: "GERENCIAR CANDIDATURAS", addUser: false, addCompanyUser: false}]}/>
            </section>
        </section>
    )
}