import CardJobs from "@/components/CardJobs";
import {SidebarRight} from "@/components/sidebar-right";

export default function Dashboard() {
    return (
        <section className="flex flex-col lg:flex-row justify-center bg-[#f9f9f9] h-full w-full md:w-[100%] mx-auto p-4">
            <section className="flex flex-col items-center pt-10 flex-1  lg:w-2/3">
                <CardJobs/>
            </section>
            <section className="flex-shrink-0 lg:w-1/3">
                <SidebarRight/>
            </section>
        </section>

    )
}