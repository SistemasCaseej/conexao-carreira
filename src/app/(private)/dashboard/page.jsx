import CardJobs from "@/components/section-position";
import {SidebarRight} from "@/components/sidebar-right";

export default function Dashboard() {
    return (
        <section className="flex bg-red-800">
            <section className="flex flex-col w-4xl px-6">
                <CardJobs/>

            </section>
            <section className="flex space-between relative">
                <SidebarRight />
            </section>
        </section>

    )
}