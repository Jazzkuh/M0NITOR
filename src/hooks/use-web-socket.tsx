import { useEffect, useState } from "react";

const useWebSocket = <T,>(url: string, onReceive?: (message: T) => void) => {
	const [messages, setMessages] = useState<T[]>([]);
	const [ws, setWs] = useState<WebSocket | null>(null);
	const [isConnected, setIsConnected] = useState(false);
	const [isConnecting, setIsConnecting] = useState(true);
	
	useEffect(() => {
		const socket = new WebSocket(url);
		setWs(socket);
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
			setIsConnecting(false);
		});
		
		socket.addEventListener("error", () => {
			console.error("Error connecting to WebSocket", url);
			setIsConnecting(false);
		});
		
		return () => {
			socket.close();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url]);
	
	const sendMessage = (message: T) => {
		if (ws && isConnected) {
			ws.send(JSON.stringify(message));
		}
	};
	
	const closeConnection = () => {
		if (ws) {
			ws.close();
		}
	};
	
	return {
		messages,
		sendMessage,
		isConnected,
		isConnecting,
		closeConnection,
		socket: ws,
	};
};

export default useWebSocket;