"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
 

export interface WithAuthProps {
  params: {
    id: string;
  };
}

export default function (WrappedComponent: React.ComponentType<WithAuthProps>) {
  return function AuthenticatedPage(props: any) {
    const { data: session, status } = useSession();
    const { push } = useRouter();

    // Check if the session is loading
    if (status === "loading") {
      return <div>Loading...</div>;
    }

    // If not authenticated, redirect to login
    if (!session) {
      push("/sign/in"); // Change "/login" to your login page route
      return null;
    }

    // If authenticated, render the wrapped component with props
    return <WrappedComponent {...props} />;
  };
}
