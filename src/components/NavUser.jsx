"use client"

import {ChevronsUpDown, LogOut, User} from "lucide-react"
import { Avatar} from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation";

export function NavUser({user}) {
    const { isMobile } = useSidebar()
    const router = useRouter();

    const handleLogout = async () =>{

        try {
            const response = await fetch("/api/session", {
                method: "DELETE",
            });

            if (response.ok) {
                router.push("/candidate-login");
            } else {
                console.error("Erro ao deslogar:", await response.text());
            }
        }catch (error){
            console.error("Erro ao deslogar:", error);
        }
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="cursor-pointer hover:bg-white hover:text-[#4c1286]">
                        <SidebarMenuButton size="lg">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <User/>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{user?.name || "Usuário"}</span>
                                <span className="truncate text-xs">{user?.email || "user@gmail.com"}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-[#4c1286] border-1 border-[#4c1286]" side={isMobile ? "bottom" : "right"} align="end" sideOffset={15}>
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex flex-row items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg text-white">
                                    <User/>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight text-white">
                                    <span className="truncate font-medium">{user?.name || "Usuário"}</span>
                                    <span className="truncate text-xs">{user?.email || "user@gmail.com"}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="bg-[#4c1286] text-white cursor-pointer hover:bg-white hover:text-[#4c1286]">
                            <LogOut/>Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

export default NavUser;
