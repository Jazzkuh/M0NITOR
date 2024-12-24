"use client";

import { useEffect, useRef, useState } from "react";
import { MonitoringData } from "@/types/monitor";

const Lyrics = ({ data }: { data: MonitoringData }) => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [currentLyricIndex, setCurrentLyricIndex] = useState<number>(0);
	
	// Process lyrics only once, initially
	const lyrics = (() => {
		if (!data.spotify.lyrics) return [];
		return data.spotify.lyrics
			?.split("\n")
			.map((line) =>
				line.includes("[") && line.includes("]") ? "" : line.trim()
			)
			.filter((line, index, arr) => line !== "" || arr[index - 1] !== "");
	})();
	
	useEffect(() => {
		if (!lyrics.length || !data.spotify.length) return;
		
		const durationPerLyric = data.spotify.length / lyrics.length;
		let newIndex = Math.floor(data.spotify.position / durationPerLyric);
		
		// Ensure the index is within the bounds of the lyrics array
		newIndex = Math.max(0, Math.min(newIndex, lyrics.length - 1));
		
		if (newIndex !== currentLyricIndex) {
			setCurrentLyricIndex(newIndex);
			
			// Perform smooth scroll
			if (scrollRef.current) {
				const lineHeight = parseFloat(getComputedStyle(scrollRef.current.firstElementChild as HTMLElement).lineHeight); // Use firstElementChild and type cast
				const scrollY = (newIndex - 3) * lineHeight;
				scrollRef.current.scrollTo({ top: scrollY, behavior: "smooth" });
			}
		}
		
	}, [data.spotify.position, data.spotify.length, lyrics, currentLyricIndex]);
	
	
	// Render ALL lyrics for full scroll
	return (
		<div className="w-full flex flex-col gap-2">
			<div
				ref={scrollRef}
				className="p-4 overflow-y-auto space-y-0 bg-sidebar rounded-md border border-border custom-lyrics-scrollbar"
				style={{
					height: "calc(16 * 1.5rem + 2rem)", // Fixed height for 16 lines
				}}
			>
				{!lyrics.length && (
					<div className="flex justify-center items-center w-full h-full">
						<p className="text-muted-foreground">
							No lyrics available for this song.
						</p>
					</div>
				)}
				{lyrics.map((line, index) => (
					<p
						key={`lyric-${index}`}
						className={`text-white text-center font-bold`}
					>
						{line || "\u00A0"}
					</p>
				))}
			</div>
		</div>
	);
};

export default Lyrics;