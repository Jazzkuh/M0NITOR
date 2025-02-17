"use client";

import * as React from "react";
import {version} from "@/../package.json";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenuButton, SidebarMenuItem,
	SidebarRail
} from "@/components/ui/sidebar";
import {NavMain} from "./nav-main";
import {NavUser} from "@/components/sidebar/nav-user";
import {User} from "next-auth";
import {
	DropdownMenu,
	DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {ChevronsUpDown, LogOut} from "lucide-react";
import Image from "next/image";
import {signOut} from "next-auth/react";
import getConfig from "next/dist/build/babel/loader/get-config";

interface Props extends React.ComponentProps<typeof Sidebar> {
	user: User;
}

export function AppSidebar({ ...props }: Props) {
	return (
		<Sidebar variant="floating" collapsible="icon">
			<SidebarHeader>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<Avatar className="h-8 w-8 rounded-md">
						<AvatarFallback>
							<Image
								src="/logo.png"
								alt="M0NITOR"
								width={32}
								height={32}
							/>
						</AvatarFallback>
					</Avatar>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-semibold">M0NITOR</span>
						<span className="truncate text-xs text-muted-foreground">
							v{ version }
						</span>
					</div>
				</SidebarMenuButton>
			</SidebarHeader>
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