"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar} from "@/components/ui/sidebar"
import { NavUser } from "@/components/NavUser";
import { NavMain } from "@/components/nav-main";
import { BriefcaseBusiness, Home, Users, Building2 } from "lucide-react";
import Image from "next/image"


export function AppSidebar({user}) {

    const { openMobile} = useSidebar()

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
                roles: ["Admin", "Candidate", "Employee"]
            },
            {
                title: "Usuários",
                url: "",
                icon: Users,
                roles: ["Admin"],
                items: [
                    {
                        title: "Usuários aprovados",
                        url: "/admin/approved-users",
                        roles : ["Admin"]
                    },
                    {
                        title: "Usuários pendentes",
                        url: "/admin/pending-users",
                        roles: ["Admin"]
                    },
                    {
                        title: "Usuários administradores",
                        url: "/admin/admin-users",
                        roles: ["Admin"]
                    },
                ],
            },
            {
                title: "Empresa",
                url: "",
                icon: Building2,
                roles: ["Admin", "Employee"],
                items: [
                    {
                        title: "Dados da empresa",
                        url: `/dashboard/${user?.companyId}`,
                        roles: ["Admin", "Employee"]
                    },
                    {
                        title: "Gerenciar empresas",
                        url: "/admin/manage-companies",
                        roles: ["Admin"]
                    },
                    {
                        title: "Gerenciar usuários",
                        url: "/admin/company/users",
                        roles: ["Admin"],
                    },
                ],
            },
            {
                title: "Vagas",
                url: "",
                icon: BriefcaseBusiness,
                roles: ["Admin", "Employee"],
                items: [
                    {
                        title: "Nova vaga",
                        url: "/dashboard/new-job",
                        roles: ["Admin", "Employee"]
                    },
                    {
                        title: "Vagas publicadas",
                        url: "/dashboard/jobs",
                        roles: ["Admin", "Employee"]
                    },
                ],
            },

        ],
    }

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
                <NavMain items={data.navMain} user={user}/>
            </SidebarContent>
            <SidebarFooter className="bg-[#4c1286] text-white">
               <NavUser user={user}/>
            </SidebarFooter>
        </Sidebar>
    )
}