import type { Metadata } from "next";
import Navbar from "./_components/Navbar/Navbar";
import Footer from "./_components/Footer/Footer";

export const metadata: Metadata = {
    title: {
        default: "Equipment Rental Platform",
        template: "%s | Equipment Rental Platform",
    },
    description:
        "Find and rent quality equipment for construction, industrial, and other professional needs.",
};

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
        <Navbar />
        {children}
        <Footer />
    </>;
}
