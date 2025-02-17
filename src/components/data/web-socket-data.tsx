"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import useWebSocket from "@/hooks/use-web-socket";

interface WebSocketDataProps<T> {
	Component: React.ComponentType<{ socket: ReturnType<typeof useWebSocket<T>> }>;
}

const WebSocketData = <T,>({ Component }: WebSocketDataProps<T>) => {
	const router = useRouter();
	const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const socket = useWebSocket<T>("wss://deamon.jazzkuh.com/ws");
	
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
	}, [socket.isConnected]);
	
	return <Component socket={socket} />;
};

export default WebSocketData;
