"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import {Skeleton} from "@/components/ui/skeleton";

const CoverArt = ({trackId}: {trackId: string}) => {
	const [coverArt, setCoverArt] = useState<string | undefined>(undefined);
	
	useEffect(() => {
		fetch("/api/spotify", {
			method: "POST",
			body: JSON.stringify({
				trackId: trackId
			})
		}).then(res => {
			res.json().then(json => {
				setCoverArt(json.thumbnail_url);
			});
		})
	}, [trackId]);
	
	if (!coverArt) return (
		<Skeleton className="bg-accent rounded-lg w-[240px] h-[240px]" />
	)
	
	return (
		<Image src={coverArt} alt="Cover art" className="rounded-lg" width={300} height={300} />
	);
};

export default CoverArt;