"use client"

import {useEffect, useState} from "react";
import CardJobs from "@/components/CardJobs";
import {SidebarRight} from "@/components/sidebar-right";
import {toast} from "sonner";
import {useSidebar} from "@/components/ui/sidebar";


export default function PageJobs(){

    const { toggleSidebar, open, openMobile, isMobile } = useSidebar()
    const isSidebarOpen = isMobile ? openMobile : open


    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            const response = await fetch(`/api/company/job/RNk2pBMBE57gT4JqxzvL`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const result = await response.json();

            if (!response.ok || !result.data?.company?.length) {
                toast.error("Não existem vagas cadastradas no sistema");
            } else {
                setJobs(result.data.company); // aqui pegamos o array
                toast.success("Vagas encontradas");
            }
        };

        fetchJobs();
    }, []);

    return (

        <section className="flex">
            <div  className={`flex justify-center p-4 ${isSidebarOpen ? "w-[880px]" : "w-[1100px]"}`}>
                <div className="w-full max-w-2xl flex flex-col items-center gap-4">
                    {jobs.map((job, i) => (
                        <CardJobs
                            key={i}
                            title={job.title}
                            company={job.company.tradeName}
                            location={job.location}
                            posted_at={job.posted_at}
                            salary_range={job.salaryRange}
                        />
                    ))}
                </div>
            </div>
            <div className="flex-[1]">
                <SidebarRight />
            </div>
        </section>

    )
}