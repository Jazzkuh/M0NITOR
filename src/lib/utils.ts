import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function percentage(value: number) {
	return 100 - ((value / 55) * 100);
}

function getBrightness(hexColor: string) {
	const r = parseInt(hexColor.slice(1, 3), 16);
	const g = parseInt(hexColor.slice(3, 5), 16);
	const b = parseInt(hexColor.slice(5, 7), 16);
	
	// Standard luminance formula
	return 0.299 * r + 0.587 * g + 0.114 * b;
}

export function getTextColorBasedOnBackground(hexColor: string) {
	const brightness = getBrightness(hexColor);
	return brightness > 140 ? "text-accent" : "text-white";
}

export function balance(left: number, right: number) {
	const leftPercentage = ((left / 55) * 100);
	const rightPercentage = ((right / 55) * 100);
	
	let balance: number = 0;
	let diff: number = 0;
	if (leftPercentage > rightPercentage) {
		balance = -1 * (leftPercentage - rightPercentage);
		diff = leftPercentage - rightPercentage;
	} else if (rightPercentage > leftPercentage) {
		balance = rightPercentage - leftPercentage;
		diff = rightPercentage - leftPercentage;
	}
	
	if (diff > 5.5) {
		switch (Math.sign(balance)) {
			case -1:
				return 0;
			case 1:
				return 100;
		}
	}
	
	return 50;
}

export function decimalToHex(decimal: number): string {
	const red = (decimal >> 16) & 0xFF;
	const green = (decimal >> 8) & 0xFF;
	const blue = decimal & 0xFF;
	
	return `#${padToTwoDigits(red.toString(16))}${padToTwoDigits(green.toString(16))}${padToTwoDigits(blue.toString(16))}`;
}

function padToTwoDigits(value: string): string {
	return value.length === 1 ? '0' + value : value;
}