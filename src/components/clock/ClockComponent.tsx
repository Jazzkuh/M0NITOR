import React from 'react'
import CircularProgressBar from "@/components/clock/CircularProgressBar";
import moment from "moment/moment";
import {MonitoringData} from "@/types/monitor";

const AudioMeter = ({ data }: {data: MonitoringData}) => {
    const time = new Date();
    function getDate() {
        return moment(new Date()).format('ddd DD.MM.YYYY');
    }
    
    function getTime(micOnTime: boolean) {
        if (!micOnTime) return data.time;
        if (!data.microphone_on) return '';
        return data.microphone_on_time;
    }
    
    return (
        <>
            <div className="flex pt-3 mb-4 justify-center items-center">
                <CircularProgressBar
                    selectedValue={time.getSeconds()}
                    maxValue={60}
                    activeStrokeColor='#FF8510'
                    inactiveStrokeColor='#636363'
                    valueFontSize={30}
                    text={getTime(false)}
                    text2={getTime(true)}
                    textColor='#CDD2D5'
                    radius={120}
                />
            </div>
            
            <div className="flex justify-center items-center pt-1 pb-5">
                <p className="color-text-blue text-3xl">{getDate()}</p>
            </div>
        </>
    );
}
export default AudioMeter
