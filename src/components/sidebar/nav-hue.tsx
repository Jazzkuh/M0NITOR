import React, { useState } from "react";
import {
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import {Lightbulb, LightbulbOffIcon, MusicIcon} from "lucide-react";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from "@/components/ui/drawer";
import HueSettingsData from "@/components/hue/hue-settings-data";
import {NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle} from "@/components/ui/navigation-menu";

export function NavHue() {
	const [isOpen, setIsOpen] = useState(false);
	
	return (
		<NavigationMenuItem>
			<Drawer onOpenChange={(open) => setIsOpen(open)}>
				<DrawerTrigger asChild>
					<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
						<span>Hue Settings</span>
					</NavigationMenuLink>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Hue Settings</DrawerTitle>
						<DrawerDescription>Customize the lighting in the studio.</DrawerDescription>
					</DrawerHeader>
					
					<HueSettingsData />
				</DrawerContent>
			</Drawer>
		</NavigationMenuItem>
	);
}
