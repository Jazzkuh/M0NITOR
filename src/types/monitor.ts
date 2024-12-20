export type MonitoringData = {
	success: boolean;
	faderStatuses: FaderStatus[];
	meteringValues: MeteringValues;
	micOn: boolean;
	time: string;
	micOnSince: number;
	micOnTime: string;
	onAir: boolean;
	cueEnabled: boolean;
	autoCueCRM: boolean;
	autoCueANN: boolean;
	cueAux: boolean;
	spotify: Spotify;
}

export type FaderStatus = {
	channelId: number;
	faderActive: boolean;
	channelOn: boolean;
	cueActive: boolean;
}

export type MeteringValues = {
	[key: string]: number;
}

export type Spotify = {
	volume: number;
	playing: boolean;
}
