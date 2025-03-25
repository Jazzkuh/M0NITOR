import Monitor from "@/components/monitor/monitor";
import { MonitoringData } from "@/types/monitor";
import WebSocketData from "@/components/data/web-socket-data";

const MonitorData = () => <WebSocketData<MonitoringData> Component={Monitor} />;
export default MonitorData;
