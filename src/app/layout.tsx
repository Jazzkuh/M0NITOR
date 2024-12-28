import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import NextTopLoader from "nextjs-toploader";
import {ThemeProvider} from "next-themes";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "M0NITOR.",
	description: "All-in-one monitoring platform",
};

const RootLayout = async ({children}: Readonly<{ children: React.ReactNode; }>) => {
	return (
		<html suppressHydrationWarning lang="en">
			<body className={cn("min-h-screen min-w-full text-sparky-text-primary font-sans antialiased", inter.className)}>
				<NextTopLoader/>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
};

export default RootLayout;