"use client";

import {useEffect, useRef} from "react";
import { useRouter } from "nextjs-toploader/app";
import useWebSocket from "@/hooks/use-web-socket";
import {MonitoringData} from "@/types/monitor";
import NowPlaying from "@/components/music/now-playing";

const NowPlayingData = () => {
	const router = useRouter();
	const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const socket = useWebSocket<MonitoringData>("wss://deamon.jazzkuh.com/ws");
	
	useEffect(() => {
		if (!socket.isConnected) {
			reconnectTimeoutRef.current = setTimeout(() => {
				if (!socket.isConnected) {
					router.refresh();
					socket.closeConnection();
				}
			}, 1000);
		} else if (reconnectTimeoutRef.current) {
			clearTimeout(reconnectTimeoutRef.current);
			reconnectTimeoutRef.current = null;
		}
		
		return () => {
			if (reconnectTimeoutRef.current) {
				clearTimeout(reconnectTimeoutRef.current);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket.isConnected]);
	
	return (
		<>
			<NowPlaying socket={socket}/>
		</>
	);
};

export default NowPlayingData;