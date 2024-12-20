import * as React from "react";

import { cn } from "@/lib/utils";

const Container = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("rounded-md bg-sidebar", className)}
		{...props}
	/>
));
Container.displayName = "Container";

const ContainerHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex flex-col space-y-1.5 p-6", className)}
		{...props}
	/>
));
ContainerHeader.displayName = "ContainerHeader";

const ContainerTitle = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("font-bold text-xl leading-none tracking-tight", className)}
		{...props}
	/>
));
ContainerTitle.displayName = "ContainerTitle";

const ContainerDescription = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("text-sm text-muted-foreground", className)}
		{...props}
	/>
));
ContainerDescription.displayName = "ContainerDescription";

const ContainerContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
ContainerContent.displayName = "ContainerContent";

const ContainerFooter = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex items-center p-6 pt-0", className)}
		{...props}
	/>
));
ContainerFooter.displayName = "ContainerFooter";

export {
	Container,
	ContainerHeader,
	ContainerFooter,
	ContainerTitle,
	ContainerDescription,
	ContainerContent,
};