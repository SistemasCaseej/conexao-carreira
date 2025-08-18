"use client"

import CardJobs from "@/components/CardJobs";
import {SidebarRight} from "@/components/sidebar-right";
import {useEffect, useState} from "react";
import {toast} from "sonner";

export default function Dashboard() {

    const [jobs, setJobs] = useState([])

    useEffect(() => {
        async function fetchJobs() {
            const response = await fetch("api/company/job", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const data = await response.json()

            if(!response.ok) {
                toast.error("Não foi possível encontrar as vagas de emprego")
            }else{
                setJobs(data)
                toast.success("Todas as vagas de emprego")
            }
        }
        fetchJobs()
    }, [])

    return (
        <section className="flex flex-col lg:flex-row justify-center bg-[#f9f9f9] h-full w-full md:w-[100%] mx-auto p-4">
            <section>
                {jobs.map((job, index) => (
                    <div key={index} className="flex flex-row pt-10">
                        <section className="lg:w-2/3 flex justify-end">
                            <CardJobs title={job.title} salary_range={job.salaryRange} company={job.company.tradeName} location={job.location} posted_at={job.posted_at} />
                        </section>
                    </div>
                ))}
            </section>

            {/*<section className="flex-shrink-0 lg:w-1/3">*/}
            {/*    <SidebarRight/>*/}
            {/*</section>*/}
        </section>

    )
}