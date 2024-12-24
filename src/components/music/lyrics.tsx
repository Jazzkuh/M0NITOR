"use client";

import { useEffect, useRef, useState } from "react";
import { MonitoringData } from "@/types/monitor";
import axios from "axios";

const Lyrics = ({ data }: { data: MonitoringData }) => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [lyrics, setLyrics] = useState<{ startTimeMs: number; words: string }[]>([]);
	const [currentLyricIndex, setCurrentLyricIndex] = useState<number>(-1);
	const [loading, setLoading] = useState<boolean>(true); // New state for loading
	const [noLyrics, setNoLyrics] = useState<boolean>(false); // New state for no lyrics
	
	// Fetch lyrics data from the API on component mount
	useEffect(() => {
		const fetchLyrics = async () => {
			try {
				setLoading(true); // Set loading to true when starting to fetch
				setNoLyrics(false); // Reset the no lyrics state before fetching
				const response = await axios.post("/api/lyrics", {
					query: data.spotify.trackId, // Assuming trackId or similar is passed to the API
				});
				
				if (response.data.lyrics && response.data.lyrics.lines.length > 0) {
					setLyrics(response.data.lyrics.lines); // Set lyrics if found
				} else {
					setNoLyrics(true); // Set noLyrics to true if no lyrics are found
				}
			} catch (error) {
				console.error("Error fetching lyrics:", error);
				setNoLyrics(true); // If error occurs, set noLyrics to true
			} finally {
				setLoading(false); // Set loading to false once fetching is complete
			}
		};
		
		fetchLyrics();
	}, [data.spotify.trackId]);
	
	// Sync the lyrics with the current song position
	useEffect(() => {
		if (lyrics.length === 0 || !data.spotify.position) return;
		
		const newIndex = lyrics.findIndex(
			(line) => line.startTimeMs >= data.spotify.position
		);
		
		// Set the current lyric index based on position
		if (newIndex !== -1 && newIndex !== currentLyricIndex) {
			setCurrentLyricIndex(newIndex - 1);
			// Perform smooth scroll
			if (scrollRef.current) {
				const lineHeight = parseFloat(
					getComputedStyle(scrollRef.current.firstElementChild as HTMLElement).lineHeight
				);
				const scrollY = (newIndex - 6) * lineHeight; // Offset for smooth scrolling
				scrollRef.current.scrollTo({ top: scrollY, behavior: "smooth" });
			}
		}
	}, [data.spotify.position, lyrics, currentLyricIndex]);
	
	return (
		<div className="w-full flex flex-col gap-2">
			<div
				ref={scrollRef}
				className="p-4 overflow-y-auto space-y-0 bg-sidebar rounded-md border border-border custom-lyrics-scrollbar"
				style={{
					height: "calc(16 * 1.5rem + 2rem)", // Fixed height for 16 lines
				}}
			>
				{loading ? (
					<div className="flex justify-center items-center w-full h-full">
						<p className="text-muted-foreground">Loading lyrics...</p>
					</div>
				) : noLyrics ? (
					<div className="flex justify-center items-center w-full h-full">
						<p className="text-muted-foreground">No lyrics available for this song.</p>
					</div>
				) : lyrics.length === 0 ? (
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
