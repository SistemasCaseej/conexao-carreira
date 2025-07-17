
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/components/app-sidebar"
import {AuthProvider} from "@/app/context/AuthContext";

export default function Layout({ children }) {
    return (
        <AuthProvider>
            <SidebarProvider>
                <AppSidebar />
                <main className="flex-1">
                    <SidebarTrigger className="absolute"/>
                    {children}
                </main>
            </SidebarProvider>
        </AuthProvider>
    )
}