import React from "react";

const DEFAULT_RADIUS = 60;
const MAX_VALUE = 10;
const SELECTED_DOT_RADIUS = 5;
const CUSTOM_DOT_RADIUS = 4;
const UNSELECTED_DOT_RADIUS = 2;
const DOT_PADDING = 8;

type Props = {
    maxValue?: number;
    selectedValue?: number;
    radius?: number;
    label?: string;
    activeStrokeColor?: string;
    inactiveStrokeColor?: string;
    labelFontSize?: number;
    valueFontSize?: number;
    anticlockwise?: boolean;
    text?: string;
    text2?: string;
    initialAngularDisplacement?: number;
    backgroundColor?: string;
    textColor?: string;
    className?: string;
    containerClassName?: string;
    ariaLabel?: string;

    /** Houd cijfers stabiel met tabular-nums + vaste min-breedte */
    stabilizeNumbers?: boolean;
    /** Aantal tekens om ruimte voor te reserveren (bv. 8 voor "HH:MM:SS") */
    reserveChars?: number;
    /** Extra ruimte tussen 1e en 2e regel (px) */
    lineGap?: number;
};

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

const CircularProgressBar: React.FC<Props> = ({
                                                  maxValue = MAX_VALUE,
                                                  selectedValue = 0,
                                                  radius = DEFAULT_RADIUS,
                                                  label = "",
                                                  activeStrokeColor = "#05a168",
                                                  inactiveStrokeColor = "#ddd",
                                                  textColor = "#000",
                                                  // oude defaults behouden
                                                  labelFontSize = Math.floor(DEFAULT_RADIUS / 3),
                                                  valueFontSize = Math.floor(DEFAULT_RADIUS / 2.5),
                                                  anticlockwise = false,
                                                  text = "",
                                                  text2 = "",
                                                  initialAngularDisplacement = 0,
                                                  backgroundColor,
                                                  className,
                                                  containerClassName,
                                                  ariaLabel,

                                                  // nieuwe opties
                                                  stabilizeNumbers = true,
                                                  reserveChars = 8, // pas aan naar je maximum (bijv. 5 voor "MM:SS", 8 voor "HH:MM:SS")
                                                  lineGap = 4,
                                              }) => {
    const diameter = radius * 2;
    const cx = radius;
    const cy = radius;

    const selectedIdx = clamp(selectedValue, 0, maxValue - 1);
    const angleStep = (2 * Math.PI) / Math.max(1, maxValue);
    const startAngle = -Math.PI / 2 + initialAngularDisplacement;

    const dots = React.useMemo(() => {
        return Array.from({ length: maxValue }, (_, i) => {
            const angle = anticlockwise ? startAngle - i * angleStep : startAngle + i * angleStep;
            const x = cx + (radius - DOT_PADDING) * Math.cos(angle);
            const y = cy + (radius - DOT_PADDING) * Math.sin(angle);

            const isActive = i <= selectedIdx;
            const r =
                i % 5 === 0
                    ? isActive
                        ? SELECTED_DOT_RADIUS
                        : CUSTOM_DOT_RADIUS
                    : isActive
                        ? SELECTED_DOT_RADIUS
                        : UNSELECTED_DOT_RADIUS;

            const fill = isActive ? activeStrokeColor : inactiveStrokeColor;

            return <circle key={i} cx={x} cy={y} r={r} fill={fill} />;
        });
    }, [maxValue, anticlockwise, angleStep, startAngle, cx, cy, radius, selectedIdx, activeStrokeColor, inactiveStrokeColor]);

    // Offset voor de tweede regel zó dat de eerste exact in het midden blijft
    const secondLineOffset = Math.round(valueFontSize * 0.75) + lineGap;

    const numericStabilizeStyles: React.CSSProperties = stabilizeNumbers
        ? {
            // gelijkmatige cijferbreedtes, als font dit ondersteunt (Inter/Roboto etc.)
            fontVariantNumeric: "tabular-nums lining-nums",
            // fallback voor oudere engines
            fontFeatureSettings: '"tnum" 1, "lnum" 1',
            // reserveer vaste breedte in ch (breedte van "0" in de gekozen font)
            minWidth: `${reserveChars}ch`,
        }
        : {};

    return (
        <div
            className={containerClassName}
            style={{ position: "relative", width: diameter, height: diameter }}
        >
            <svg
                width={diameter}
                height={diameter}
                viewBox={`0 0 ${diameter} ${diameter}`}
                role="img"
                aria-label={ariaLabel ?? label ?? text ?? "Circular progress"}
                className={className}
            >
                {backgroundColor && <circle cx={cx} cy={cy} r={radius} fill={backgroundColor} />}

                <g>{dots}</g>

                {label && (
                    <text
                        x={cx}
                        y={cy + radius * 0.6}
                        fill={textColor}
                        fontSize={labelFontSize}
                        textAnchor="middle"
                        dominantBaseline="middle"
                    >
                        {label}
                    </text>
                )}
            </svg>

            {/* Hoofdregel: absoluut gecentreerd, verschuift nooit */}
            {text && (
                <div
                    aria-live="polite"
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                        lineHeight: 1,
                        pointerEvents: "none",
                        color: textColor,
                        fontSize: valueFontSize,
                        ...numericStabilizeStyles,
                    }}
                >
                    {text}
                </div>
            )}

            {/* Tweede regel: vast onder het midden, hoofdregel blijft exact in het midden */}
            {text2 && (
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: `calc(50% + ${secondLineOffset}px)`,
                        transform: "translateX(-50%)",
                        textAlign: "center",
                        lineHeight: 0,
                        pointerEvents: "none",
                        color: "#A52116",
                        fontSize: 15, // oude vaste waarde
                    }}
                >
                    {text2}
                </div>
            )}
        </div>
    );
};

export default CircularProgressBar;
