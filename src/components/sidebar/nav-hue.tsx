import React, { useState } from "react";
import {
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import {LightbulbIcon} from "lucide-react";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import HueDataComponent from "@/components/hue/hue-data";

export function NavHue() {
	const [isOpen, setIsOpen] = useState(false);
	
	return (
		<SidebarMenuItem>
			<Drawer onOpenChange={(open) => setIsOpen(open)}>
				<DrawerTrigger asChild>
					<SidebarMenuButton isActive={isOpen}>
						<LightbulbIcon />
						<span>Lights</span>
					</SidebarMenuButton>
				</DrawerTrigger>
				<DrawerTitle hidden={true}>Lights</DrawerTitle>
				<DrawerContent>
					<HueDataComponent />
				</DrawerContent>
			</Drawer>
		</SidebarMenuItem>
	);
}
