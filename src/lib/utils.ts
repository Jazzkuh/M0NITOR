import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function percentage(db: number) {
    const MIN_DB = -50;
    const MAX_DB = 5;

    const clamped = Math.min(MAX_DB, Math.max(MIN_DB, db));
    return ((clamped - MIN_DB) / (MAX_DB - MIN_DB)) * 100;
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