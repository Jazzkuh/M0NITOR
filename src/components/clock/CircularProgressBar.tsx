import React from 'react';

function shadeColor(color: string, percent: number) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);
    
    R = parseInt(`${(R * (100 + percent)) / 100}`, 10);
    G = parseInt(`${(G * (100 + percent)) / 100}`, 10);
    B = parseInt(`${(B * (100 + percent)) / 100}`, 10);
    
    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;
    
    const RR = R.toString(16).length === 1 ? `0${R.toString(16)}` : R.toString(16);
    const GG = G.toString(16).length === 1 ? `0${G.toString(16)}` : G.toString(16);
    const BB = B.toString(16).length === 1 ? `0${B.toString(16)}` : B.toString(16);
    
    return `#${RR}${GG}${BB}`;
}

const DEFAULT_RADIUS = 60;
const MAX_VALUE = 10;
const SELECTED_DOT_RADIUS = 5;
const CUSTOM_DOT_RADIUS = 4;
const UNSELECTED_DOT_RADIUS = 2;
const DOT_PADDING = 8; // Adjust as needed

const Direction = {
    CLOCKWISE: -1,
    ANTI_CLOCKWISE: 1,
};

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
    
    if (text2?.length < 1) {
        return (
            <svg width={radius * 2} height={radius * 2}>
                {renderDots()}
                <text fill={textColor} fontSize={valueFontSize} x={radius} y={textValueY} textAnchor="middle">
                    {text}
                </text>
                {!!label.length && labelView}
            </svg>
        );
    }
    
    return (
        <svg width={radius * 2} height={radius * 2}>
            {renderDots()}
            <text fill={textColor} fontSize={valueFontSize} x={radius} y={textValueY} textAnchor="middle">
                {text}
            </text>
            <text fill={'#A52116'} fontSize={15} x={radius} y={textValueY + 20} textAnchor="middle">
                {text2}
            </text>
            {!!label.length && labelView}
        </svg>
    );
};

export default CircularProgressBar;
