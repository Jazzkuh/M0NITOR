"use client";

import {useEffect, useRef} from "react";
import { useRouter } from "nextjs-toploader/app";
import useWebSocket from "@/hooks/use-web-socket";
import Monitor from "@/components/monitor/monitor";
import {MonitoringData} from "@/types/monitor";
import ChannelRow from "@/components/monitor/channel/channel-row";

const MonitorData = () => {
	const router = useRouter();
	const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const socket = useWebSocket<MonitoringData>("ws://141.224.204.8:8082/ws");
	
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
			<Monitor socket={socket}/>
		</>
	);
};

export default MonitorData;