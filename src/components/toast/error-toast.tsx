"use client";

import {useEffect} from "react";
import {toast} from "sonner";

function ErrorToast({ message }: { message: string }) {
	useEffect(() => {
		toast.error(message, { closeButton: true });
	}, [message]);
	
	return <></>;
}

export default ErrorToast;