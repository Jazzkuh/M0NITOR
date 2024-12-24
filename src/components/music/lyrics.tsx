"use client";

import { useEffect, useRef, useState } from "react";
import { MonitoringData } from "@/types/monitor";
import axios from "axios";

const Lyrics = ({ data }: { data: MonitoringData }) => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [lyrics, setLyrics] = useState<{ startTimeMs: number; words: string }[]>([]);
	const [currentLyricIndex, setCurrentLyricIndex] = useState<number>(-1);
	
	const [loading, setLoading] = useState<boolean>(true);
	const [noLyrics, setNoLyrics] = useState<boolean>(false);
	
	useEffect(() => {
		const fetchLyrics = async () => {
			try {
				setLoading(true);
				setNoLyrics(false);
				const response = await axios.post("/api/lyrics", {
					query: data.spotify.trackId,
					token: data.spotify.token,
				});
				
				if (response.data.lyrics && response.data.lyrics.lines.length > 0) {
					setLyrics(response.data.lyrics.lines);
				} else {
					setNoLyrics(true);
				}
			} catch (error) {
				console.error("Error fetching lyrics:", error);
				setNoLyrics(true);
			} finally {
				setLoading(false);
			}
		};
		
		fetchLyrics();
	}, [data.spotify.trackId]);
	
	useEffect(() => {
		if (lyrics.length === 0 || !data.spotify.position) return;
		
		const newIndex = lyrics.findIndex(
			(line) => line.startTimeMs >= data.spotify.position
		);
		
		if (newIndex !== -1 && newIndex !== currentLyricIndex) {
			setCurrentLyricIndex(newIndex - 1);
			
			if (scrollRef.current) {
				const lineHeight = parseFloat(
					getComputedStyle(scrollRef.current.firstElementChild as HTMLElement).lineHeight
				);
				
				const containerHeight = scrollRef.current.clientHeight;
				const centerOffset = (containerHeight - lineHeight) / 2;
				
				const scrollY = newIndex * lineHeight - centerOffset;
				scrollRef.current.scrollTo({
					top: scrollY,
					behavior: "smooth",
				});
			}
		}
	}, [data.spotify.position, lyrics, currentLyricIndex]);
	
	return (
		<div className="w-full flex flex-col gap-2">
			<div
				ref={scrollRef}
				className="p-4 overflow-y-auto space-y-0 bg-sidebar rounded-md border border-border custom-lyrics-scrollbar"
				style={{
					height: "calc(16 * 1.5rem + 2rem)",
				}}
			>
				{loading ? (
					<div className="flex justify-center items-center w-full h-full">
						<p className="text-muted-foreground">Loading lyrics...</p>
					</div>
				) : noLyrics || lyrics.length === 0 ? (
					<div className="flex justify-center items-center w-full h-full">
						<p className="text-muted-foreground">No lyrics available for this song.</p>
					</div>
				) : (
					lyrics.map((line, index) => (
						<p
							key={`lyric-${index}`}
							className={`text-center ${
								currentLyricIndex === index ? "text-white font-bold" : "text-muted-foreground"
							}`}
						>
							{line.words || "\u00A0"}
						</p>
					))
				)}
			</div>
		</div>
	);
};

export default Lyrics;
