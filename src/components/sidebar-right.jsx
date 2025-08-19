import * as React from "react"

import {Sidebar,} from "@/components/ui/sidebar"
import Image from "next/image";
import {DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import { ScrollArea} from "@/components/ui/scroll-area";

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    calendars: [
        {
            name: "My Calendars",
            items: ["Personal", "Work", "Family"],
        },
        {
            name: "Favorites",
            items: ["Holidays", "Birthdays"],
        },
        {
            name: "Other",
            items: ["Travel", "Reminders", "Deadlines"],
        },
    ],
}

export function SidebarRight({job,...props}) {

    console.log("SidebarRight" , job)

    return (
            <Sidebar collapsible="none" className="font-mona-sans fixed right-0 top-0 hidden h-svh border-l lg:flex w-[27vw]"{...props}>
                <ScrollArea>
                    <section className="flex-col py-4 h-svh">
                        <section data-qa="photo" className="flex flex-col py-4 justify-center items-center">
                            <Image
                                src="/jose.jpg"
                                alt="Imagem"
                                width="120"
                                height="120"
                                className="object-cover border-1 rounded-2xl"
                            />
                            <h1 className="text-2xl font-normal mt-4">{job?.title}</h1>
                            <span className="text-[#6b6969]">{job?.company.tradeName}</span>
                        </section>
                        <DropdownMenuSeparator />
                        <section data-qa="position-information" className="flex flex-row px-6 py-2 justify-between h-[25vh]">
                            <section className="flex flex-col justify-around">
                                <div>
                                    <p className="font-normal text-gray-600 text-sm">Localização</p>
                                    <h3 className="font-medium">{job?.location}</h3>
                                </div>
                                <div>
                                    <p className="font-normal text-gray-600 text-sm">Salário</p>
                                    <h3 className="font-medium">{job?.salaryRange?.minSalary && job?.salaryRange?.maxSalary
                                        ? `${job.salaryRange.minSalary} - ${job.salaryRange.maxSalary}`
                                        : "Não informado"}</h3>
                                </div>
                            </section>
                            <section className="flex flex-col justify-around">
                                <div>
                                    <p className="font-normal text-gray-600 text-sm">Modelo de Trabalho</p>
                                    <h3 className="font-medium">Híbrido</h3>
                                </div>
                                <div>
                                    <p className="font-normal text-gray-600 text-sm">Tipo de Contratação</p>
                                    <h3 className="font-medium">{job?.employmentType}</h3>
                                </div>
                            </section>
                        </section>
                        <DropdownMenuSeparator />
                        <article data-qa="position-description" className="px-6 py-4">
                            <h3 className="font-medium text-lg">Descrição</h3>
                            <p className="py-2 font-normal">{job.description}</p>
                        </article>
                        <article data-qa="position-description" className="px-6 py-6">
                            <h3 className="font-medium text-lg">Requisitos</h3>
                            <ul className="list-disc list-inside space-y-2 py-2">
                                {job?.requirements.map((requirement, index) => (
                                    <li key={index}>{requirement}</li>
                                ))}
                            </ul>
                        </article>
                    </section>
                </ScrollArea>
            </Sidebar>
    )
}
