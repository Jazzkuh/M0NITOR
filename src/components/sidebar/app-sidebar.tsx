"use client";

import * as React from "react";

import {Sidebar, SidebarContent, SidebarRail} from "@/components/ui/sidebar";
import {NavMain} from "./nav-main";

export function AppSidebar() {
	return (
		<Sidebar variant="floating" collapsible="icon">
			<SidebarContent>
				<NavMain />
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}