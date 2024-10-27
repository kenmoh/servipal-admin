import Navbar from "@/components/navbar";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (


        <main style={{ flexGrow: 1 }} className="">
            <Navbar />
            <div className="p-[20px]">
                {children}
            </div>
        </main>


    );

}
