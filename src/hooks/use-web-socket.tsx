import { useEffect, useRef, useState } from "react";

const useWebSocket = <T,>(url: string) => {
    const socketRef = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(true);

    useEffect(() => {
        let destroyed = false;

        const connect = () => {
            if (destroyed) return;

            const socket = new WebSocket(url);
            socketRef.current = socket;
            setIsConnecting(true);

            socket.addEventListener("open", () => {
                setIsConnected(true);
                setIsConnecting(false);
            });

            socket.addEventListener("close", () => {
                setIsConnected(false);
                setIsConnecting(true);
                setTimeout(connect, 1000);
            });

            socket.addEventListener("error", () => {
                console.error("WebSocket error:", url);
                socket.close();
            });
        };

        connect();

        return () => {
            destroyed = true;
            socketRef.current?.close();
        };
    }, [url]);

    const sendMessage = (message: T) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(message));
        }
    };

    return { sendMessage, isConnected, isConnecting, socket: socketRef.current };
};

export default useWebSocket;
