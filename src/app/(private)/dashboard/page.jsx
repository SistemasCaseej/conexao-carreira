"use client"

import CardJobs from "@/components/CardJobs";
import {SidebarRight} from "@/components/sidebar-right";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {useSidebar} from "@/components/ui/sidebar";
import { ScrollArea} from "@/components/ui/scroll-area";
import {useAuth} from "@/app/context/AuthContext";

export default function Dashboard() {

    const { toggleSidebar, open, openMobile, isMobile } = useSidebar()
    const isSidebarOpen = isMobile ? openMobile : open

    const [jobs, setJobs] = useState([])
    const { user } = useAuth();
    const [selectedJob, setSelectedJob] = useState(null)

    useEffect(() => {
        async function fetchJobs() {

            try{
                const response = await fetch("/api/company/job", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) throw new Error("Erro ao buscar vagas");

                const result = await response.json();

                if (!result?.length) {
                    toast.error("Não há vagas de emprego cadastradas no sistema", {
                        style: {
                            border: "1px solid #ef4444",
                            padding: "16px",
                            color: "#fff",
                            background: "#dc2626",
                        },
                    });
                    setSelectedJob(null);
                    return;
                }

                setJobs(result);
                setSelectedJob(result[0]);
                toast.success("Todas as vagas de emprego", {
                    style: {
                        border: "1px solid #22c55e",
                        padding: "16px",
                        color: "#fff",
                        background: "#16a34a",
                    },
                    iconTheme: {
                        primary: "#16a34a",
                        secondary: "#fff",
                    },
                });
            }catch(error){
                toast.error("Erro ao carregar vagas");
                console.error(error);
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
                                    logo={job.company.logo}
                                />
                            ))}
                        </div>
                </div>
                {selectedJob && (
                    <div className="flex-[1]">
                        <SidebarRight job={selectedJob} button={user.role !== "Employee"}/>
                    </div>
                )}
            </ScrollArea>
        </section>

    )
}