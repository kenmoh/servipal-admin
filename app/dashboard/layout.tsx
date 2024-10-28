import AppSidebar from "@/components/app-sidebar"
import Navbar from "@/components/navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";



export default function Layout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        <div>Loading...</div>
    }
    if (!isAuthenticated) {
        redirect('/auth')
    }
    return (

        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <aside>
                <SidebarProvider >
                    <AppSidebar />
                    <SidebarTrigger />

                </SidebarProvider>
            </aside>
            <main style={{ flexGrow: 1, padding: '20px' }}>
                <Navbar />
                {children}
            </main>
        </div>

    );

}
