import type { Metadata } from "next";
import {Inter} from "next/font/google";
import "../globals.css";
import {Toaster} from "sonner";
import {ThemeProvider} from "next-themes";
import {cn} from "@/lib/utils";
import NextTopLoader from "nextjs-toploader";
import {TooltipProvider} from "@/components/ui/tooltip";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {getAuthSession} from "@/lib/auth";
import {redirect} from "next/navigation";
import React from "react";
import NavBar from "@/components/navbar/navbar";
import MonitorData from "@/components/monitor/data/monitor-data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "M0NITOR",
    description: "All-in-one monitoring platform",
};

export default async function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    const session = await getAuthSession();
    if (!session) return redirect("/sign-in");
    
    return (
        <html suppressHydrationWarning lang="en">
            <head>
                <meta name="apple-mobile-web-app-capable" content="yes"/>
                <meta name="viewport" content="minimal-ui"/>
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
            </head>
            
            <body className={cn("min-h-screen min-w-full text-sparky-text-primary font-sans antialiased", inter.className)}>
                <NextTopLoader/>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                    <Toaster richColors position="top-center" />
                    <TooltipProvider>
                        <SidebarInset>
                            <div className="flex flex-3 flex-col p-4 pt-2">
                                {children}
                            </div>
                        </SidebarInset>
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
