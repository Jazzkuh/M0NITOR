import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function NavigationMenu({
                            className,
                            children,
                            viewport = true,
                            alignBar = "center",
                            zones = false,
                            edgePadding = "md",
                            zoneGap = "md",
                            centerAuto = true,
                            ...props
                        }: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
    viewport?: boolean
    alignBar?: "left" | "center" | "right"
    zones?: boolean
    edgePadding?: "none" | "sm" | "md" | "lg" | "xl"
    zoneGap?: "none" | "sm" | "md" | "lg" | "xl"
    centerAuto?: boolean
}) {
    const edgePaddingMap: Record<NonNullable<typeof edgePadding>, string> = {
        none: "px-0",
        sm: "px-2 sm:px-4",
        md: "px-4 sm:px-6",
        lg: "px-6 sm:px-8",
        xl: "px-8 sm:px-12",
    }

    const zoneGapMap: Record<NonNullable<typeof zoneGap>, string> = {
        none: "gap-x-0",
        sm: "gap-x-2",
        md: "gap-x-4 md:gap-x-8",
        lg: "gap-x-6 md:gap-x-12",
        xl: "gap-x-8 md:gap-x-16",
    }

    return (
        <NavigationMenuPrimitive.Root
            data-slot="navigation-menu"
            data-viewport={viewport}
            className={cn(
                zones
                    ? "group/navigation-menu relative grid items-center w-full"
                    : "group/navigation-menu relative flex max-w-max items-center justify-center",
                zones && (centerAuto ? "grid-cols-[1fr_max-content_1fr]" : "grid-cols-3"),
                zones && zoneGapMap[zoneGap],
                zones && edgePaddingMap[edgePadding],
                !zones && (alignBar === "center" ? "mx-auto" : alignBar === "right" ? "ml-auto" : undefined),
                className
            )}
            {...props}
        >
            {children}
            {viewport && <NavigationMenuViewport />}
        </NavigationMenuPrimitive.Root>
    )
}

/**
 * NavigationMenuList
 *
 * New prop: `justify` — control alignment of all items in the list.
 * - "start" (links), "center" (default), "end" (rechts),
 * - "between" | "around" | "evenly" (flex utilities)
 */
function NavigationMenuList({
                                className,
                                justify = "center",
                                zone,
                                ...props
                            }: React.ComponentProps<typeof NavigationMenuPrimitive.List> & {
    justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
    zone?: "left" | "center" | "right"
}) {
    const justifyMap: Record<NonNullable<typeof justify>, string> = {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly",
    }

    const zoneMap: Record<NonNullable<NonNullable<typeof zone>>, string> = {
        left: "justify-self-start col-start-1",
        center: "justify-self-center col-start-2",
        right: "justify-self-end col-start-3",
    }

    return (
        <NavigationMenuPrimitive.List
            data-slot="navigation-menu-list"
            className={cn(
                "group flex list-none items-center gap-4",
                justifyMap[justify],
                zone ? zoneMap[zone] : undefined,
                className
            )}
            {...props}
        />
    )
}

/**
 * NavigationMenuItem
 *
 * New prop: `align` — push a single item to left/center/right inside the list
 * using auto margins. Works best with <NavigationMenuList justify="start"/"between">.
 * - "left"  -> adds `mr-auto`
 * - "center"-> adds `mx-auto` (place items before & after to truly center)
 * - "right" -> adds `ml-auto`
 */
function NavigationMenuItem({
                                className,
                                align,
                                ...props
                            }: React.ComponentProps<typeof NavigationMenuPrimitive.Item> & {
    align?: "left" | "center" | "right"
}) {
    const alignClass =
        align === "right"
            ? "ml-auto"
            : align === "left"
                ? "mr-auto"
                : align === "center"
                    ? "mx-auto"
                    : undefined

    return (
        <NavigationMenuPrimitive.Item
            data-slot="navigation-menu-item"
            className={cn("relative", alignClass, className)}
            {...props}
        />
    )
}

const navigationMenuTriggerStyle = cva(
    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1"
)

function NavigationMenuTrigger({
                                   className,
                                   children,
                                   ...props
                               }: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
    return (
        <NavigationMenuPrimitive.Trigger
            data-slot="navigation-menu-trigger"
            className={cn(navigationMenuTriggerStyle(), "group", className)}
            {...props}
        >
            {children}{" "}
            <ChevronDownIcon
                className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
                aria-hidden="true"
            />
        </NavigationMenuPrimitive.Trigger>
    )
}

function NavigationMenuContent({
                                   className,
                                   ...props
                               }: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
    return (
        <NavigationMenuPrimitive.Content
            data-slot="navigation-menu-content"
            className={cn(
                "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
                "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
                className
            )}
            {...props}
        />
    )
}

function NavigationMenuViewport({
                                    className,
                                    ...props
                                }: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
    return (
        <div className={cn("absolute top-full left-0 isolate z-50 flex justify-center")}>
            <NavigationMenuPrimitive.Viewport
                data-slot="navigation-menu-viewport"
                className={cn(
                    "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
                    className
                )}
                {...props}
            />
        </div>
    )
}

function NavigationMenuLink({
                                className,
                                ...props
                            }: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
    return (
        <NavigationMenuPrimitive.Link
            data-slot="navigation-menu-link"
            className={cn(
                "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
                className
            )}
            {...props}
        />
    )
}

function NavigationMenuIndicator({
                                     className,
                                     ...props
                                 }: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
    return (
        <NavigationMenuPrimitive.Indicator
            data-slot="navigation-menu-indicator"
            className={cn(
                "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
                className
            )}
            {...props}
        >
            <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
        </NavigationMenuPrimitive.Indicator>
    )
}

export {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuContent,
    NavigationMenuTrigger,
    NavigationMenuLink,
    NavigationMenuIndicator,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
}
