"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar} from "@/components/ui/sidebar"
import { NavUser } from "@/components/NavUser";
import { NavMain } from "@/components/nav-main";
import { BookOpen, Star, BriefcaseBusiness, Home, Search, Users, Building2 } from "lucide-react";

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
            items: [
                {
                    title: "History",
                    url: "#",
                },
                {
                    title: "Starred",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Procurar Emprego",
            url: "#",
            icon: Search,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Empresas Favoritas",
            url: "#",
            icon: Star,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentação",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Usuários",
            url: "",
            icon: Users,
            items: [
                {
                    title: "Usuários Aprovados",
                    url: "/admin/approved-users",
                },
                {
                    title: "Usuários Pendentes",
                    url: "/admin/pending-users",
                },
                {
                    title: "Usuários Administradores",
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
                    title: "Dados da Empresa",
                    url: "admin/"
                },
                {
                    title: "Gerenciar Empresas",
                    url: "/admin/manage-companies",
                },
                {
                    title: "Gerenciar Usuários",
                    url: "/admin/company/users",
                },
            ],
        },
        {
            title: "Vagas",
            url: "",
            icon: Building2,
            items: [
                {
                    title: "Cadastrar Nova Vaga",
                    url: "admin/"
                },
                {
                    title: "Vagas Publicadas",
                    url: "/admin/",
                },
                {
                    title: "Candidaturas Recebidas",
                    url: "/admin/cp",
                },
            ],
        },

    ],
}

export function AppSidebar({user}) {

    const { openMobile} = useSidebar()

    return (
        <Sidebar open={openMobile} className="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="/dashboard">
                                <div className="bg-sidebar-primary dark text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <BriefcaseBusiness className="size-4" />
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
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
               <NavUser user2={data.user} user={user}/>
            </SidebarFooter>
        </Sidebar>
    )
}