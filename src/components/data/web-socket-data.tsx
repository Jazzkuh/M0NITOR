"use client";

import useWebSocket from "@/hooks/use-web-socket";

interface WebSocketDataProps<T> {
    Component: React.ComponentType<{ socket: ReturnType<typeof useWebSocket<T>> }>;
}

const WebSocketData = <T,>({ Component }: WebSocketDataProps<T>) => {
    const socket = useWebSocket<T>("wss://deamon.jazzkuh.com/ws");
    return <Component socket={socket} />;
};

export default WebSocketData;
