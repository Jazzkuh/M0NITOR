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
	lights: BulbData[];
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
	track: string;
	artist: string;
	trackId: string;
	volume: number;
	playing: boolean;
	length: number;
	position: number;
	lyrics: string | null;
	token: string | null;
}

export type BulbData = {
	name: string;
	ip: string;
	groups: string;
}