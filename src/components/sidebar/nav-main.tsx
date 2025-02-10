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
import {NavNowPlaying} from "@/components/sidebar/nav-now-playing";

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
					<NavNowPlaying />
				</SidebarMenu>
			</SidebarGroup>
		</>
	);
}