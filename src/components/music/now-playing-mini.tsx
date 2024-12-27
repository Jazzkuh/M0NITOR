"use client";

import {MonitoringData} from "@/types/monitor";
import CoverArt from "@/components/music/cover-art";
import {Progress} from "@/components/ui/progress";

const NowPlayingMini = ({data}: {data: MonitoringData}) => {
	if (!data) return null;
	
	function getProgress(current: number, max: number) {
		return (current / max) * 100;
	}
	
	function getDuration(duration: number) {
		const minutes = Math.floor(duration / 60000);
		const seconds = ((duration % 60000) / 1000).toFixed(0);
		return minutes + ":" + (parseInt(seconds) < 10 ? '0' : '') + seconds;
	}
	
	return (
		<div className="rounded-lg bg-accent p-3 mt-3">
			<div className="flex flex-row gap-4">
				<div className="flex flex-col justify-center">
					<CoverArt trackId={data.spotify.track_id} width={100} height={100}/>
				</div>
				
				<div className="flex flex-col justify-center w-full">
					<p className="font-bold text-xl leading-none tracking-tight">{data.spotify.track}</p>
					<p className="text-md text-muted-foreground">{data.spotify.artist}</p>
					
					<div className="flex flex-col mt-2">
						<Progress value={getProgress(data.spotify.position, data.spotify.length)} className={
							"w-[100%] h-1 bg-white/20"
						}/>
						<div className="flex flex-row">
							<p className="text-muted-foreground w-full text-xs">
								{getDuration(data.spotify.position)}
							</p>
							
							<p className="text-muted-foreground text-xs">
								{getDuration(data.spotify.length)}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NowPlayingMini;