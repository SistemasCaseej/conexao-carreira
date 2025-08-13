import CompanyDetailsClient from "@/components/CompanyDetailsClient";

export default async function CompanyPage({params}) {

    const {id} = await params;

    return <CompanyDetailsClient id={id}/>
}