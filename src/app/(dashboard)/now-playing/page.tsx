import React from "react";
import MonitorData from "@/components/monitor/monitor-data";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {Separator} from "@/components/ui/separator";
import {SidebarInset, SidebarTrigger} from "@/components/ui/sidebar";
import NowPlayingData from "@/components/music/now-playing-data";

const HomePage = async () => {
	return (
		<SidebarInset>
			<header
				className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1"/>
					<Separator orientation="vertical" className="mr-2 h-4"/>
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block"/>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbPage>Now Playing</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>
			
			<div className="flex flex-1 flex-col p-4 pt-2">
				<NowPlayingData />
			</div>
		</SidebarInset>
	);
}

export default HomePage;
