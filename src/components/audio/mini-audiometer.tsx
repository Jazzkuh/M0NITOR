import React from 'react';
import { Separator } from "@/components/ui/separator";

const TinyAudioMeter = ({ left, right }: { left: number, right: number }) => {

    const METER_HEIGHT = 110;
    const MIN_DB = -50;
    const MAX_DB = 5;

    // Convert dB to percentage for the meter height
    const dbToPercent = (db: number) => ((db - MIN_DB) / (MAX_DB - MIN_DB)) * 100;

    // Convert dB to vertical position (top) within meter
    const dbToPosition = (db: number) => METER_HEIGHT - (dbToPercent(db) / 100) * METER_HEIGHT;

    const stripes = [0, -10, -20, -30, -40, -50];

    return (
        <div className="flex gap-1">
            {/* Meter bar with stripes */}
            <div style={{ position: 'relative', height: METER_HEIGHT }}>
                <div className="meter-bar" style={{ width: 5, height: METER_HEIGHT }}>
                    <div
                        className="meter-background bg-[#68e178]"
                        style={{
                            height: `${Math.max((left), -30)}%`, // clamp under -30 dB
                            transition: "height 0.08s linear"
                        }}
                    />
                </div>

                <div className="meter-bar" style={{ width: 5, height: METER_HEIGHT, marginLeft: 2 }}>
                    <div
                        className="meter-background bg-[#68e178]"
                        style={{
                            height: `${Math.max((right), -30)}%`, // clamp under -30 dB
                            transition: "height 0.08s linear"
                        }}
                    />
                </div>

                {/* Stripes */}
                {stripes.map((db, idx) => (
                    <div
                        key={idx}
                        style={{
                            position: 'absolute',
                            top: dbToPosition(db),
                            left: 12,
                            width: '16px',
                            height: 1,
                            backgroundColor: '#636363'
                        }}
                    />
                ))}
            </div>

            {/* Labels */}
            <div
                style={{
                    position: 'relative',
                    height: METER_HEIGHT,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start'
                }}
            >
                {stripes.map((db, idx) => (
                    <div
                        key={idx}
                        style={{
                            position: 'absolute',
                            top: dbToPosition(db) - 9,
                            right: -12,
                            width: 20,
                            fontSize: 7,
                            color: '#636363',
                            textAlign: 'right',
                        }}
                    >
                        {db}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TinyAudioMeter;
