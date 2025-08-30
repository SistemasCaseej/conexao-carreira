import CompanyDetailsClient from "@/components/CompanyDetailsClient";
import {requireAuth} from "@/utils/requireAuth";

export default async function CompanyPage({params}) {

    await requireAuth(["Admin"], "/dashboard");

    const {id} = await params;

    return <CompanyDetailsClient id={id} canEdit={true}/>
}