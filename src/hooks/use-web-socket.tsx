import React, { useEffect, useState } from "react";

const useWebSocket = <T,>(url: string, onReceive?: (message: T) => void) => {
	const [messages, setMessages] = useState<T[]>([]);
	const socketRef = React.useRef<WebSocket | null>(null);
	const [isConnected, setIsConnected] = useState(false);
	const [isConnecting, setIsConnecting] = useState(true);
	
	useEffect(() => {
		const reconnect = () => {
			const socket = new WebSocket(url);
			socketRef.current = socket;
			setIsConnecting(true);
			
			socket.addEventListener("open", () => {
				setIsConnected(true);
			});
			
			socket.addEventListener("message", (event) => {
				const data: T = JSON.parse(event.data);
				setMessages((prevMessages) => [...prevMessages, data]);
				setIsConnecting(false);
				
				if (onReceive) {
					onReceive(data);
				}
			});
			
			socket.addEventListener("close", () => {
				setIsConnected(false);
				setIsConnecting(true);
				setTimeout(reconnect, 1000);
			});
			
			socket.addEventListener("error", () => {
				console.error("Error connecting to WebSocket", url);
				setIsConnected(false);
				socket.close();
			});
		}
		
		reconnect();
		
		return () => {
			if (socketRef.current) {
				socketRef.current.close();
			}
		};
	}, [url]);
	
	const sendMessage = (message: T) => {
		if (socketRef.current && isConnected) {
			socketRef.current.send(JSON.stringify(message));
		}
	};
	
	const closeConnection = () => {
		if (socketRef.current) {
			socketRef.current.close();
		}
	};
	
	return {
		messages,
		sendMessage,
		isConnected,
		isConnecting,
		closeConnection,
		socket: socketRef.current
	};
};

export default useWebSocket;