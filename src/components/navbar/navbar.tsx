"use client";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {NavNowPlaying} from "@/components/sidebar/nav-now-playing";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import Image from "next/image";
import * as React from "react";
import {NavHue} from "@/components/sidebar/nav-hue";
import {NavUser} from "@/components/sidebar/nav-user";
import {User} from "next-auth";

const NavBar = ({ user }: {user: User}) => {
    return (
        <NavigationMenu zones edgePadding="none" zoneGap="xl" centerAuto>
            <NavigationMenuList zone="left" justify="start">
                <NavigationMenuItem align={"left"}>
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
                </NavigationMenuItem>

                <NavNowPlaying />
                <NavHue />
            </NavigationMenuList>

            <NavigationMenuList zone="center" justify="center">
            </NavigationMenuList>

            <NavigationMenuList zone="right" justify="end">
                <NavUser user={user}/>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
export default NavBar;