import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function percentage(value: number) {
	return 100 - ((value / 55) * 100);
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