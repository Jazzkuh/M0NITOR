import { useState, useEffect } from "react";
import NowPlaying from "@/components/music/now-playing";
import { MonitoringData } from "@/types/monitor";
import WebSocketData from "@/components/data/web-socket-data";

const NowPlayingData = () => (
    <WebSocketData<MonitoringData>
        Component={({ socket }) => {
            const [data, setData] = useState<MonitoringData | null>(null);

            useEffect(() => {
                if (socket.socket) {
                    socket.socket.onmessage = (event) => {
                        setData(JSON.parse(event.data));
                    };
                }
            }, [socket.socket]);

            return data ? <NowPlaying data={data} /> : <div>Loading...</div>;
        }}
    />
);
export default NowPlayingData;
