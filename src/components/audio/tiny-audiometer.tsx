const TinyAudioMeter = ({ text, left, right, balance, height = 250 }: { text: String, left: number, right: number, balance: number, height?: number }) => {

    const METER_HEIGHT = height;
    const MIN_DB = -50;
    const MAX_DB = 5;
    const RANGE_DB = MAX_DB - MIN_DB;

    function dbToY(db: number): number {
        const clamped = Math.min(MAX_DB, Math.max(MIN_DB, db));
        const ratio = (MAX_DB - clamped) / RANGE_DB;
        return ratio * METER_HEIGHT;
    }

    const majorDbs = [5, 0, -10, -20, -30, -40, -50];
    const majorSet = new Set(majorDbs);
    const minorDbs: number[] = [];
    for (let db = MAX_DB - 2; db > MIN_DB; db -= 2) {
        if (!majorSet.has(db)) minorDbs.push(db);
    }

    return (
        <div className="w-[88px]">
            <p className="text-center text-sm pb-1.5">{text}</p>

            <div style={{ position: 'relative', display: 'inline-block' }}>
                <svg
                    style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, pointerEvents: 'none' }}
                    width={88}
                    height={METER_HEIGHT}
                >
                    {majorDbs.map(db => {
                        const y = dbToY(db);
                        const labelY = db === MAX_DB ? y + 5 : db === MIN_DB ? y - 5 : y;
                        return (
                            <g key={db}>
                                <rect x={24} y={y} width={8} height={1} fill="rgba(255,255,255,0.35)" />
                                <rect x={56} y={y} width={8} height={1} fill="rgba(255,255,255,0.35)" />
                                <text
                                    x={44}
                                    y={labelY}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fill="rgba(255,255,255,0.3)"
                                    fontSize={7}
                                    fontFamily="Inter, Arial, sans-serif"
                                >
                                    {db > 0 ? `+${db}` : db}
                                </text>
                            </g>
                        );
                    })}
                    {minorDbs.filter(db => db % 5 === 0).map(db => {
                        const y = dbToY(db);
                        return (
                            <g key={db}>
                                <rect x={24} y={y} width={5} height={1} fill="rgba(255,255,255,0.15)" />
                                <rect x={59} y={y} width={5} height={1} fill="rgba(255,255,255,0.15)" />
                            </g>
                        );
                    })}
                </svg>

                <div className="meter-bar" style={{ width: 24, height: METER_HEIGHT, marginBottom: 15 }}>
                    <div
                        className="meter-background bg-[#68e178]"
                        style={{ height: `${left}%`, transition: "height 0.08s linear" }}
                    />
                </div>
                <div className="meter-bar" style={{ width: 24, height: METER_HEIGHT, marginLeft: 40 }}>
                    <div
                        className="meter-background bg-[#68e178]"
                        style={{ height: `${right}%`, transition: "height 0.08s linear" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default TinyAudioMeter;
