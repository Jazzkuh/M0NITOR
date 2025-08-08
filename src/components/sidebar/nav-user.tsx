"use client";

import {ChevronsUpDown, LogOut} from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,} from "@/components/ui/sidebar";
import {User} from "next-auth";
import {signOut} from "next-auth/react";
import Image from "next/image";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {NavigationMenuItem, NavigationMenuLink} from "@/components/ui/navigation-menu";
import * as React from "react";

export function NavUser({ user }: { user: User; }) {
	return (
		<NavigationMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<NavigationMenuLink
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-md">
								<Image
									src="/logo.png"
									alt="M0NITOR"
									width={32}
									height={32}
								/>
							</Avatar>
						</NavigationMenuLink>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={"bottom"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="text-sm text-muted-foreground">
							Github Account
						</DropdownMenuLabel>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Image
									src={user.avatar_url}
									className="rounded-full w-10 h-10 ring-0 outline-none transition duration-150 hover:opacity-70"
									alt="Profile Picture"
									width={40}
									height={40}
								/>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">{user.login}</span>
									<span className="truncate text-xs text-muted-foreground">{user.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator/>
						<DropdownMenuGroup>
							<DropdownMenuItem
								className="cursor-pointer"
								onClick={() => signOut()}
							>
								<LogOut className="pr-2" />
								Log out
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
		</NavigationMenuItem>
	);
}