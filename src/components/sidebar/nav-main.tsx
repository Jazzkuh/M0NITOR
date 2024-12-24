import {
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {DashboardIcon} from "@radix-ui/react-icons";
import React from "react";
import {NavNowplaying} from "@/components/sidebar/nav-nowplaying";

export function NavMain() {
	const pathName = usePathname();
	
	return (
		<>
			<SidebarGroup>
				<SidebarGroupLabel>M0NITOR</SidebarGroupLabel>
				<SidebarMenu>
					<SidebarMenuItem>
						<Link href="/">
							<SidebarMenuButton
								isActive={pathName === "/"}
								tooltip="Dashboard"
							>
								<DashboardIcon />
								<span>Dashboard</span>
							</SidebarMenuButton>
						</Link>
					</SidebarMenuItem>
				</SidebarMenu>
				<SidebarMenu>
					<NavNowplaying />
				</SidebarMenu>
			</SidebarGroup>
		</>
	);
}