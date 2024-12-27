"use client";

import { useEffect, useRef, useState } from "react";
import { MonitoringData } from "@/types/monitor";
import axios from "axios";
import {load} from "signal-exit";

const Lyrics = ({ data }: { data: MonitoringData }) => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [lyrics, setLyrics] = useState<{ startTimeMs: number; words: string }[]>([]);
	const [currentLyricIndex, setCurrentLyricIndex] = useState<number>(-1);
	const [fadeDuration, setFadeDuration] = useState<number>(0); // Animation duration
	
	const [loading, setLoading] = useState<boolean>(true);
	const [noLyrics, setNoLyrics] = useState<boolean>(false);
	
	useEffect(() => {
		const fetchLyrics = async () => {
			try {
				setLoading(true);
				setNoLyrics(false);
				const response = await axios.post("/api/lyrics", {
					query: data.spotify.track_id,
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
	}, [data.spotify.track_id]);
	
	useEffect(() => {
		if (lyrics.length === 0 || !data.spotify.position) return;
		
		const newIndex = lyrics.findIndex(
			(line) => line.startTimeMs >= data.spotify.position
		);
		
		if (newIndex !== -1 && newIndex !== currentLyricIndex) {
			const nextStartTime = lyrics[newIndex]?.startTimeMs || 0;
			const currentStartTime = lyrics[newIndex - 1]?.startTimeMs || 0;
			const duration = nextStartTime - currentStartTime;
			
			setFadeDuration(Math.min(duration, duration - 300));
			setCurrentLyricIndex(newIndex - 1);
			
			if (scrollRef.current) {
				const containerHeight = scrollRef.current.clientHeight;
				const currentLineElement = scrollRef.current.children[newIndex] as HTMLElement;
				
				if (currentLineElement) {
					const currentLineRect = currentLineElement.getBoundingClientRect();
					const containerRect = scrollRef.current.getBoundingClientRect();
					
					const currentLineCenter = currentLineRect.top + currentLineRect.height / 2;
					const containerCenter = containerRect.top + containerHeight / 2;
					
					const scrollDistance = currentLineCenter - containerCenter;
					
					let start = scrollRef.current.scrollTop;
					let duration = 250;
					let startTime: number | null = null;
					
					const smoothScroll = (timestamp: number) => {
						if (!startTime) startTime = timestamp;
						const elapsed = timestamp - startTime;
						const progress = Math.min(elapsed / duration, 1);
						
						const easedProgress = 1 - (1 - progress) * (1 - progress);
						
						scrollRef.current?.scrollTo({
							top: start + scrollDistance * easedProgress,
						});
						
						if (progress < 1) {
							requestAnimationFrame(smoothScroll);
						}
					};
					
					requestAnimationFrame(smoothScroll);
				}
			}
		}
	}, [data.spotify.position, lyrics, currentLyricIndex]);
	
	if (loading || noLyrics) return null;
	
	return (
		<div className="w-full flex flex-col gap-2">
			<div
				ref={scrollRef}
				className="p-4 overflow-y-auto space-y-0 bg-background rounded-md border border-background custom-lyrics-scrollbar"
				style={{
					height: "calc(16 * 1.5rem + 2rem)",
				}}
			>
				{loading ? (
					<div className="flex justify-center items-center w-full h-full">
						<p className="text-muted-foreground">Loading lyrics...</p>
					</div>
				) : noLyrics || lyrics.length === 0 ? (
					data.spotify.lyrics ? (data.spotify.lyrics?.split("\n").map((line, index) => (
						<p key={`lyric-${index}`} className="text-center text-muted-foreground">
							{line}
						</p>
					))) : (
						<div className="flex justify-center items-center w-full h-full">
							<p className="text-muted-foreground">This song has no lyrics available.</p>
						</div>
					)
				) : (
					lyrics.map((line, index) => (
						<p
							key={`lyric-${index}`}
							className={`text-center ${
								currentLyricIndex === index
									? "text-white font-bold fade-effect stay-bold"
									: "text-muted-foreground opacity-60"
							}`}
							style={{
								animationDuration: currentLyricIndex === index ? `${fadeDuration}ms` : "0ms",
							}}
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
