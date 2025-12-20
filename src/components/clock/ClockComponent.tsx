'use client'

import React, { useEffect, useState } from 'react'
import CircularProgressBar from "@/components/clock/CircularProgressBar";
import moment from "moment";
import { MonitoringData } from "@/types/monitor";

const AudioMeter = ({ data }: { data: MonitoringData }) => {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());

        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!time) return null; // voorkomt hydration mismatch

    const getDate = () =>
        moment(time).format('ddd DD.MM.YYYY');

    const getTime = (micOnTime: boolean) => {
        if (!micOnTime) {
            return data?.time ?? moment(time).format('HH:mm:ss');
        }

        if (!data?.microphone_on) return '';
        return data.microphone_on_time;
    };

    return (
        <>
            <div className="flex pt-3 mb-4 justify-center items-center">
                <CircularProgressBar
                    selectedValue={time.getSeconds()}
                    maxValue={60}
                    activeStrokeColor="#a1fcc6"
                    inactiveStrokeColor="#636363"
                    valueFontSize={26}
                    text={getTime(false)}
                    text2={getTime(true)}
                    textColor="#CDD2D5"
                    radius={120}
                />
            </div>

            <div className="flex justify-center items-center pt-1 pb-5">
                <p className="text-2xl" style={{ color: "#CDD2D5" }}>
                    {getDate()}
                </p>
            </div>
        </>
    );
};

export default AudioMeter;
