import React, { useState } from "react";
import { MusicIcon } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import NowPlayingData from "@/components/music/now-playing-data";
import {
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export function NavNowPlaying() {
	const [isOpen, setIsOpen] = useState(false);
	
	return (
		<NavigationMenuItem align={"center"}>
			<Drawer onOpenChange={(open) => setIsOpen(open)}>
				<DrawerTrigger asChild>
					<NavigationMenuLink asChild className={navigationMenuTriggerStyle() + " bg-primary text-background rounded-full hover:text-background hover:bg-[#62CC8BFF]"}>
						<span>Now Playing</span>
					</NavigationMenuLink>
				</DrawerTrigger>
				<DrawerContent>
					<NowPlayingData />
				</DrawerContent>
			</Drawer>
		</NavigationMenuItem>
	);
}
