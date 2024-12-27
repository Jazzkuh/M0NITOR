"use client";

import {signIn} from "next-auth/react";
import {useSearchParams} from "next/navigation";
import {MouseEvent, useState} from "react";
import {Puff} from "react-loader-spinner";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";


const SignInButton = ({
                          service,
                          display,
                      }: {
    service: "github";
    display: string;
}) => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || undefined;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const login = async (event: MouseEvent) => {
        event.preventDefault();
        
        setIsLoading(true);
        
        toast.promise(signIn(service, { callbackUrl }), {}),
            {
                loading: `Loading ${service}...`,
                success: "Redirecting...",
                error: "Failed to log in!",
            };
    };
    
    return (
        <Button
            variant="default"
            className="w-full bg-blue-500 hover:bg-blue-500/80"
            disabled={isLoading}
            onClick={login}
        >
            {isLoading ? (
                <Puff
                    height="24"
                    width="24"
                    radius={1}
                    color="white"
                    ariaLabel="puff-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            ) : (
                <div>Continue with {display}</div>
            )}
        </Button>
    );
};

export default SignInButton;
