import type { Metadata } from "next";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import 'bootstrap/dist/css/bootstrap.css'
import { BookStoreListProvider } from "./core/BookListProvider";

export const metadata: Metadata = {
    title: "AdminDashboard",
    description: "Admin Dashboard Page",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <BookStoreListProvider>
            <div className="col-12 row">
                <div className="col-3 h-100" >
                <Sidebar/>
                </div>
                <div className="col-9">
                <Header/>
                <div>{children}</div>
                </div>
            </div>
            </BookStoreListProvider>
        </div>
    );
}
