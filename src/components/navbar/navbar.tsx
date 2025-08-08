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
import * as React from "react";
import {NavHue} from "@/components/sidebar/nav-hue";
import {NavUser} from "@/components/sidebar/nav-user";
import {User} from "next-auth";

const NavBar = ({ user }: {user: User}) => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavUser user={user}/>
                <NavNowPlaying />
                <NavHue />
            </NavigationMenuList>
        </NavigationMenu>
    );
}
export default NavBar;