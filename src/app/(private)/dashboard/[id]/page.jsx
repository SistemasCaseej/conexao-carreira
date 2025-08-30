import {requireAuth} from "@/utils/requireAuth";
import CompanyDetailsClient from "@/components/CompanyDetailsClient";

export default async function CompanyPage({params}) {

    await requireAuth(["Admin", "Employee"], "/dashboard");

    const {id} = await params;

    return <CompanyDetailsClient id={id} canEdit={false}/>
}