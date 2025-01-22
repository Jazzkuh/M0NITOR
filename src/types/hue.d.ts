export type HueData = {
	success: boolean;
	lights: Light[];
}

export type Light = {
	name: string;
	on: boolean;
	brightness: number;
}
