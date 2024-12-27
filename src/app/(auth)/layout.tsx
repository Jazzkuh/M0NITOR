import "../globals.css";
import {redirect} from "next/navigation";

import {Toaster} from "@/components/ui/sonner";
import Providers from "@/components/providers";
import NextTopLoader from "nextjs-toploader";
import {getAuthSession} from "@/lib/auth";
import React from "react";

const RootLayout = async ({children}: Readonly<{ children: React.ReactNode; }>) => {
	const session = await getAuthSession();
	if (session) return redirect("/");
	
	return (
		<Providers>
			<NextTopLoader />
			<Toaster richColors position="top-center" />
			{children}
		</Providers>
	);
};

export default RootLayout;