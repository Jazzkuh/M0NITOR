import HueSettings from "@/components/hue/hue-settings";
import { MonitoringData } from "@/types/monitor";
import WebSocketData from "@/components/data/web-socket-data";

const HueSettingsData = () => <WebSocketData<MonitoringData> Component={HueSettings} />;
export default HueSettingsData;
