import React from 'react';
import {Separator} from "@/components/ui/separator";

const AudioMeter = ({ text, left, right, balance }: { text: String, left: number, right: number, balance: number }) => {

    function getSeparator(margin: number) {
        return (
            <p className="meter-text" style={{marginTop: margin}}>
                -&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
            </p>
        );
    }

    function getLineSeparator(margin: number, text: string) {
        return (
            <>
                <p className="meter-text text-center text-xs" style={{marginTop: margin - 14, marginLeft: 33}}>{text}</p>
                <p className="meter-text" style={{marginTop: margin}}>
                    <Separator orientation="horizontal" className="w-10 bg-[#636363]"/>
                </p>
            </>
        );
    }

    const METER_HEIGHT = 440;   // px
    const MIN_DB = -50;
    const MAX_DB = 5;
    const RANGE_DB = MAX_DB - MIN_DB; // 55 dB

    function dbToY(db: number) {
        const clamped = Math.min(MAX_DB, Math.max(MIN_DB, db));
        const ratio = (MAX_DB - clamped) / RANGE_DB;
        return ratio * METER_HEIGHT;
    }

    return (
        <div>
            <p className="text-center text-lg pb-1.5">{text}</p>

            <div>
                {/* Minor ticks (every 2 dB) */}
                {Array.from({ length: 28 }).map((_, i) => {
                    const db = 5 - i * 2;
                    if (db % 10 === 0) return null;
                    if (i >= 27) return null;
                    return getSeparator(dbToY(db));
                })}

                {/* Major ticks */}
                {getLineSeparator(dbToY(4.9), "")}

                <p className="meter-text text-center text-xs" style={{ marginTop: 30, marginLeft: 40 }}>0</p>
                {getLineSeparator(dbToY(-0.5), "")}

                {getLineSeparator(dbToY(-10.5), "-10")}
                {getLineSeparator(dbToY(-20.5), "-20")}
                {getLineSeparator(dbToY(-30.5), "-30")}
                {getLineSeparator(dbToY(-40.5), "-40")}
                {getLineSeparator(dbToY(-50), "-50")}

                {/* Left meter */}

                <div className="meter-bar" style={{ width: 24, height: 440, marginBottom: 15 }}>
                    <div
                        className="meter-background bg-[#68e178]"
                        style={{
                            height: `${left}%`,
                            transition: "height 0.08s linear"
                        }}
                    />
                </div>

                <div className="meter-bar" style={{ width: 24, height: 440, marginLeft: 40 }}>
                    <div
                        className="meter-background bg-[#68e178]"
                        style={{
                            height: `${right}%`,
                            transition: "height 0.08s linear",
                        }}
                    />
                </div>
            </div>

            <div>
                <input
                    type="range"
                    value={balance}
                    style={{
                        WebkitBorderRadius: 0,
                        WebkitBorderBottomRightRadius: 0,
                        WebkitAppearance: 'none',
                        width: 89,
                    }}
                    className="bg-accent appearance-none disabled meter-range"
                />
                <p className="meter-text text-center text-xs general-text" style={{ marginTop: -4.8, marginLeft: -4 }}>-1</p>
                <p className="meter-text text-center text-xs general-text" style={{ marginTop: -4.8, marginLeft: 40 }}>0</p>
                <p className="meter-text text-center text-xs general-text" style={{ marginTop: -4.8, marginLeft: 80 }}>+1</p>
            </div>
        </div>
    );
};

export default AudioMeter;