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
import {MusicIcon} from "lucide-react";
import {Drawer, DrawerContent, DrawerTitle, DrawerTrigger} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import NowPlayingData from "@/components/music/now-playing-data";
import React from "react";

export function NavNowplaying() {
	const pathName = usePathname();
	
	return (
		<SidebarMenuItem>
			<Drawer>
				<DrawerTrigger asChild>
					<SidebarMenuButton
						isActive={pathName === "/now-playing"}
					>
						<MusicIcon />
						<span>Now Playing</span>
					</SidebarMenuButton>
				</DrawerTrigger>
				<DrawerTitle hidden={true}>Now Playing</DrawerTitle>
				<DrawerContent>
					<NowPlayingData />
				</DrawerContent>
			</Drawer>
		</SidebarMenuItem>
	);
}