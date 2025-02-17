import NowPlaying from "@/components/music/now-playing";
import { MonitoringData } from "@/types/monitor";
import WebSocketData from "@/components/data/web-socket-data";

const NowPlayingData = () => <WebSocketData<MonitoringData> Component={NowPlaying} />;
export default NowPlayingData;
