import React from 'react';

const DEFAULT_RADIUS = 60;
const MAX_VALUE = 10;
const SELECTED_DOT_RADIUS = 5;
const CUSTOM_DOT_RADIUS = 4;
const UNSELECTED_DOT_RADIUS = 2;
const DOT_PADDING = 8; // Adjust as needed

type Props = {
    maxValue?: number;
    selectedValue?: number;
    radius?: number;
    strokeWidth?: number;
    label?: string;
    activeStrokeColor?: string;
    inactiveStrokeColor?: string;
    labelFontSize?: number;
    valueFontSize?: number;
    withGradient?: boolean;
    anticlockwise?: boolean;
    text?: string;
    text2?: string;
    initialAngularDisplacement?: number;
    backgroundColor?: string;
    textColor?: string;
};

const CircularProgressBar = ({
                                 maxValue = MAX_VALUE,
                                 selectedValue = 0,
                                 radius = DEFAULT_RADIUS,
                                 label = '',
                                 activeStrokeColor = '#05a168',
                                 inactiveStrokeColor = '#ddd',
                                 textColor = '#000',
                                 labelFontSize = Math.floor(DEFAULT_RADIUS / 3),
                                 valueFontSize = Math.floor(DEFAULT_RADIUS / 2.5),
                                 anticlockwise = false,
                                 text = '',
                                 text2 = '',
                                 initialAngularDisplacement = 0,
                             }: Props) => {
    const renderDots = () => {
        const dots = [];
        const angleIncrement = (2 * Math.PI) / maxValue;
        const startAngle = anticlockwise ? Math.PI / 2 : -Math.PI / 2;
        for (let i = 0; i < maxValue; i++) {
            const angle = startAngle + i * angleIncrement + initialAngularDisplacement;
            const x = radius + (radius - DOT_PADDING) * Math.cos(angle);
            const y = radius + (radius - DOT_PADDING) * Math.sin(angle);
            let dotRadius;
            if (i % 5 === 0) {
                dotRadius = i <= selectedValue ? SELECTED_DOT_RADIUS : CUSTOM_DOT_RADIUS;
            } else {
                dotRadius = i <= selectedValue ? SELECTED_DOT_RADIUS : UNSELECTED_DOT_RADIUS;
            }
            const fillColor = i <= selectedValue ? activeStrokeColor : inactiveStrokeColor;
            dots.push(<circle key={i} cx={x} cy={y} r={dotRadius} fill={fillColor} />);
        }
        return dots;
    };

    const labelView = (
        <text fill={textColor} fontSize={labelFontSize} x={radius} y={radius + labelFontSize} textAnchor="middle">
            {label}
        </text>
    );

    const textValueY = label ? radius : radius + valueFontSize / 3;
    const paddedDot = text?.startsWith("11:") ? (radius + DOT_PADDING) / 2 : (radius - DOT_PADDING) / 2

    if (text2?.length < 1) {
        return (
            <svg width={radius * 2} height={radius * 2}>
                {renderDots()}
                <text fill={textColor} fontSize={valueFontSize} x={paddedDot} y={textValueY} className="text-center">
                    {text}
                </text>
                {!!label.length && labelView}
            </svg>
        );
    }

    return (
        <svg width={radius * 2} height={radius * 2}>
            {renderDots()}
            <text fill={textColor} fontSize={valueFontSize} x={paddedDot} y={textValueY} className="text-center">
                {text}
            </text>
            <text fill={'#A52116'} fontSize={15} x={(radius - (radius / 4))} y={textValueY + 20} className="text-center">
                {text2}
            </text>
            {!!label.length && labelView}
        </svg>
    );
};

export default CircularProgressBar;
