"use client"

import CardJobs from "@/components/CardJobs";
import {SidebarRight} from "@/components/sidebar-right";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {useSidebar} from "@/components/ui/sidebar";
import { ScrollArea} from "@/components/ui/scroll-area";

export default function Dashboard() {

    const { toggleSidebar, open, openMobile, isMobile } = useSidebar()
    const isSidebarOpen = isMobile ? openMobile : open

    const [jobs, setJobs] = useState([])
    const [selectedJob, setSelectedJob] = useState(null)


    useEffect(() => {
        async function fetchJobs() {
            const response = await fetch("api/company/job", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const result = await response.json()


            if(!response.ok || !result?.length) {
                toast.error("Não há vagas de emprego cadastradas no sistema")
                setSelectedJob(null)
            }else{
                setJobs(result);
                setSelectedJob(result[0]);
                toast.success("Todas as vagas de emprego")
            }
        }
        fetchJobs()
    }, [])

    return (
        <section className="flex h-screen pt-15">
            <ScrollArea className="scroll-smooth">
                <div className={`flex justify-center transition-all duration-300 ease-in-out  ${isSidebarOpen ? "w-[870px]" : "w-[1122px]"}`}>
                    <div className="w-full max-w-2xl flex flex-col items-center gap-4 mb-3">
                            {jobs.map((job, i) => (
                                <CardJobs
                                    key={i}
                                    title={job.title}
                                    company={job.company.tradeName}
                                    location={job.location}
                                    posted_at={job.posted_at}
                                    salary_range={job.salaryRange}
                                    isSelected={selectedJob?.id === job.id}
                                    on_details={() => setSelectedJob(job)}
                                />
                            ))}
                        </div>
                </div>
                {selectedJob && (
                    <div className="flex-[1]">
                        <SidebarRight job={selectedJob} button={true}/>
                    </div>
                )}
            </ScrollArea>
        </section>

    )
}