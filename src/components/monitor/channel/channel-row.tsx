"use client";

import { MonitoringData } from "@/types/monitor";
import ChannelStatus from "@/components/monitor/channel/channel-status";

const ChannelRow = ({ data }: { data: MonitoringData }) => {
    return (
        <div className="flex flex-row gap-2 justify-center h-full">
            {data.faders.map((_, i) => (
                <ChannelStatus key={i} data={data} channel={i} />
            ))}
        </div>
    );
};

export default ChannelRow;
