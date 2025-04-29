import Monitor from "@/components/monitor/monitor";
import { MonitoringData } from "@/types/monitor";
import WebSocketData from "@/components/data/web-socket-data";

const MonitorData = async () => <WebSocketData<MonitoringData> Component={Monitor} />;
export default MonitorData;
