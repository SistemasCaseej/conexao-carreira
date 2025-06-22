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

export function SidebarRight({...props}) {
    return (
            <Sidebar collapsible="none" className="fixed right-0 top-0 hidden h-svh border-l lg:flex w-[27vw]"{...props}>
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
                            <h1 className="text-2xl font-semibold mt-2">UIUX Designer</h1>
                            <span className="text-[#1d9bf0] font-semibold">Twitter</span>
                        </section>
                        <DropdownMenuSeparator />
                        <section data-qa="position-information" className="flex flex-row px-6 py-2 justify-between h-[30vh]">
                            <section className="flex flex-col justify-around">
                                <div>
                                    <p className="font-normal text-gray-600 text-sm">Modelo de Trabalho</p>
                                    <h3 className="font-semibold">Híbrido</h3>
                                </div>
                                <div>
                                    <p className="font-normal text-gray-600 text-sm">Localização</p>
                                    <h3 className="font-semibold">Macaé</h3>
                                </div>
                                <div>
                                    <p className="font-normal text-gray-600 text-sm">Salário</p>
                                    <h3 className="font-semibold">R$ 2.000 - R$ 3.000</h3>
                                </div>
                            </section>
                            <section className="flex flex-col justify-around">
                                <div>
                                    <p className="font-normal text-gray-600 text-sm">Modelo de Trabalho</p>
                                    <h3 className="font-semibold">Híbrido</h3>
                                </div>
                                <div>
                                    <p className="font-normal text-gray-600 text-sm">Tipo de Contratação</p>
                                    <h3 className="font-semibold">CLT</h3>
                                </div>
                                <div>
                                    <p className="font-normal text-gray-600 text-sm">Experiência</p>
                                    <h3 className="font-semibold">4 anos</h3>
                                </div>
                            </section>
                        </section>
                        <DropdownMenuSeparator />
                        <article data-qa="position-description" className="px-6 py-4">
                            <h3 className="font-semibold text-xl">Requisitos</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>2+ anos de experiência em desenvolvimento frontend.</li>
                                <li>Sólidos conhecimentos em HTML, CSS e JavaScript</li>
                                <li>Experiência com React ou outros frameworks modernos de JavaScript.</li>
                                <li>Familiaridade com APIs RESTful e sistemas de controle de versão como Git.</li>
                                <li>Familiaridade com APIs RESTful e sistemas de controle de versão como Git.</li>
                                <li>Familiaridade com APIs RESTful e sistemas de controle de versão como Git.</li>

                            </ul>
                        </article>
                    </section>
                </ScrollArea>
            </Sidebar>
    )
}
