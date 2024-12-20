import React from 'react';
import { Progress } from "@/components/ui/progress";
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
	
	return (
		<div className="content-center" style={{position: "relative"}}>
			<p className="text-center text-lg pb-1.5">{text}</p>
			
			<div>
				<p className="meter-text" style={{marginTop: 1}}>
					<Separator orientation="horizontal" className="w-10 bg-[#636363]"/>
				</p>
				
				{getSeparator(5.6)}
				{getSeparator(21.6)}
				{getSeparator(37.6)}
				
				<p className="meter-text text-center text-xs" style={{ marginTop: 54.6, marginLeft: 40.8 }}>0</p>
				<p className="meter-text" style={{ marginTop: 66.6 }}>
					<Separator orientation="horizontal" className="w-10 bg-[#636363]"/>
				</p>
				
				{getSeparator(65.6)}
				{getSeparator(77.6)}
				{getSeparator(89.6)}
				{getSeparator(101.6)}
				{getSeparator(113.6)}
				{getSeparator(125.6)}
				{getSeparator(137.6)}
				
				{getLineSeparator(164.6, "-10")}
				
				{getSeparator(161.6)}
				{getSeparator(173.6)}
				{getSeparator(185.6)}
				{getSeparator(197.6)}
				{getSeparator(209.6)}
				{getSeparator(221.6)}
				{getSeparator(233.6)}
				
				{getLineSeparator(257.6, "-20")}
				
				{getSeparator(254.6)}
				{getSeparator(266.6)}
				{getSeparator(278.6)}
				{getSeparator(290.6)}
				{getSeparator(302.6)}
				{getSeparator(314.6)}
				{getSeparator(326.6)}
				
				{getLineSeparator(350.6, "-30")}
				
				{getSeparator(347.6)}
				{getSeparator(359.6)}
				{getSeparator(371.6)}
				{getSeparator(383.6)}
				{getSeparator(395.6)}
				
				{getLineSeparator(419.6, "-40")}
				
				{getSeparator(416.6)}
				
				<div className="meter-bar" style={{ width: 24, height: 440, marginBottom: 15 }}>
					<div className="meter-background bg-accent" style={{ height: left + "%" }} />
				</div>
				<div className="meter-bar" style={{ width: 24, height: 440, marginLeft: 40 }}>
					<div className="meter-background bg-accent" style={{ height: right + "%" }} />
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
