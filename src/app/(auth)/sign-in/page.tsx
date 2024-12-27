import {Metadata} from "next";
import Image from "next/image";
import React from "react";
import ErrorToast from "@/components/toast/error-toast";
import {Container, ContainerContent, ContainerHeader, ContainerTitle} from "@/components/ui/container";
import SignInButton from "@/components/auth/sign-in-button";

export const metadata: Metadata = {
	title: "Sign in",
};

const SignInPage = async (props: { searchParams: Promise<{ error?: string }>; }) => {
	const searchParams = await props.searchParams;
	return (
		<>
			{!!searchParams.error && (
				<ErrorToast
					message={
						searchParams.error === "AccessDenied"
							? "You are not authorized to log in!"
							: "Something went wrong whilst logging you in!"
					}
				/>
			)}
			
			<div className="min-h-screen flex items-center justify-center">
				<Container className="w-full h-screen first-letter:py-4 px-6 md:h-auto md:w-fit flex flex-col items-center justify-center gap-4">
					<ContainerHeader>
						<ContainerTitle>Sign In</ContainerTitle>
					</ContainerHeader>
					<ContainerContent>
						<div className="pt-2 w-full">
							<SignInButton service="github" display="Github"/>
						</div>
					</ContainerContent>
				</Container>
			</div>
		</>
	);
};

export default SignInPage;