"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import {Skeleton} from "@/components/ui/skeleton";

const CoverArt = ({trackId, width, height}: {trackId: string; width: number; height: number;}) => {
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
		<Skeleton className={`bg-[#333333] rounded-sm`} style={{
			width: `${width * 0.86}px`,
			height: `${height * 0.85}px`
		}} />
	)
	
	return (
		<Image src={coverArt} alt="Cover art" width={width} height={height} className="rounded-sm" />
	);
};

export default CoverArt;