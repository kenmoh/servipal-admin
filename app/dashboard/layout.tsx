import AppSidebar from "@/components/app-sidebar"
import Navbar from "@/components/navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";



export default function Layout({ children }: { children: React.ReactNode }) {
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
