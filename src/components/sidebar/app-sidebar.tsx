"use client";

import * as React from "react";

import {Sidebar, SidebarContent, SidebarFooter, SidebarRail} from "@/components/ui/sidebar";
import {NavMain} from "./nav-main";
import {NavUser} from "@/components/sidebar/nav-user";
import {User} from "next-auth";

interface Props extends React.ComponentProps<typeof Sidebar> {
	user: User;
}

export function AppSidebar({ ...props }: Props) {
	return (
		<Sidebar variant="floating" collapsible="icon">
			<SidebarContent>
				<NavMain />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={props.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}