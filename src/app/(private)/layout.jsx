
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/components/app-sidebar"
import {AuthProvider} from "@/app/context/AuthContext";
import {getUser} from "@/dal/user/dal";
import {Toaster} from "sonner";


export default async function Layout({children}) {

    const user = await getUser();

    return (
        <AuthProvider>
            <SidebarProvider>
                <AppSidebar user={user}/>
                <main className="flex-1 relative">
                    <SidebarTrigger className="absolute"/>
                    <Toaster />
                    {children}
                </main>
            </SidebarProvider>
        </AuthProvider>
    )
}