"use server";

import { RingApi } from 'ring-client-api';
import {toast} from "sonner";

const ringApi = new RingApi({
	refreshToken: process.env.RING_TOKEN as string,
	cameraStatusPollingSeconds: 20,
	debug: true,
});

export async function subscribeToEvents() {
	ringApi.onRefreshTokenUpdated.subscribe(({ newRefreshToken }) => {
		console.log('New refresh token:', newRefreshToken);
	});
	
	ringApi.getLocations().then(locations => {
		for (const location of locations) {
			for (const device of location.cameras) {
				device.onMotionDetected.subscribe(() => {
					toast.warning(`Motion detected on ${device.name}`, { closeButton: true });
				});
				
				device.onDoorbellPressed.subscribe(() => {
					toast.warning(`Doorbell pressed on ${device.name}`, { closeButton: true });
				});
			}
		}
	});
}

subscribeToEvents();
