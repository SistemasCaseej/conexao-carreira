import CardJobs from "@/components/CardJobs";
import {SidebarRight} from "@/components/sidebar-right";
import NavigationBar from "@/components/NavigationBar";

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