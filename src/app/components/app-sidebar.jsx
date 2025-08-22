"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar} from "@/components/ui/sidebar"
import { NavUser } from "@/components/NavUser";
import { NavMain } from "@/components/nav-main";
import { BriefcaseBusiness, Home, Users, Building2 } from "lucide-react";
import Image from "next/image"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Home",
            url: "/dashboard",
            icon: Home,
            isActive: true,
        },
        {
            title: "Usuários",
            url: "",
            icon: Users,
            items: [
                {
                    title: "Usuários aprovados",
                    url: "/admin/approved-users",
                },
                {
                    title: "Usuários pendentes",
                    url: "/admin/pending-users",
                },
                {
                    title: "Usuários administradores",
                    url: "/admin/admin-users",
                },
            ],
        },
        {
            title: "Empresa",
            url: "",
            icon: Building2,
            items: [
                {
                    title: "Dados da empresa",
                    url: "admin/"
                },
                {
                    title: "Gerenciar empresas",
                    url: "/admin/manage-companies",
                },
                {
                    title: "Gerenciar usuários",
                    url: "/admin/company/users",
                },
            ],
        },
        {
            title: "Vagas",
            url: "",
            icon: BriefcaseBusiness,
            items: [
                {
                    title: "Nova vaga",
                    url: "/dashboard/new-job"
                },
                {
                    title: "Vagas publicadas",
                    url: "/dashboard/jobs",
                },
            ],
        },

    ],
}

export function AppSidebar({user}) {

    const { openMobile} = useSidebar()

    return (
        <Sidebar open={openMobile} className="">
            <SidebarHeader className="bg-[#4c1286] text-white">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="/dashboard">
                                <div className="size-8 items-center justify-center rounded-lg">
                                    <Image src="/logo_case.png" alt="logo_case" width={200} height={200} className="rounded-lg"></Image>
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-medium">Conexão Carreira</span>
                                    <span className="">v1.0.0</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="text-white bg-[#4c1286]">
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter className="bg-[#4c1286] text-white">
               <NavUser user2={data.user} user={user}/>
            </SidebarFooter>
        </Sidebar>
    )
}