import React, { useState } from "react";
import {
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { MusicIcon } from "lucide-react";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import NowPlayingData from "@/components/music/now-playing-data";

export function NavNowPlaying() {
	const [isOpen, setIsOpen] = useState(false);
	
	return (
		<SidebarMenuItem>
			<Drawer onOpenChange={(open) => setIsOpen(open)}>
				<DrawerTrigger asChild>
					<SidebarMenuButton isActive={isOpen}>
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
