export type MonitoringData = {
	success: boolean;
	faders: Fader[];
	metering: MeteringValues;
	microphone_on: boolean;
	time: string;
	microphone_on_since: number;
	microphone_on_time: string;
	on_air: boolean;
	cue_enabled: boolean;
	auto_cue_crm: boolean;
	auto_cue_announcer: boolean;
	cue_aux: boolean;
	cue_air: boolean;
	spotify: Spotify;
}

export type Fader = {
	channel_id: number;
	fader_active: boolean;
	channel_on: boolean;
	cue_active: boolean;
}

export type MeteringValues = {
	program_left: number;
	program_right: number;
	phones_left: number;
	phones_right: number;
	crm_left: number;
	crm_right: number;
}

export type Spotify = {
	track: string;
	artist: string;
	track_id: string;
	volume: number;
	playing: boolean;
	length: number;
	position: number;
	lyrics: string | null;
	token: string | null;
}