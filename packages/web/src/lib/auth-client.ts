import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // baseURL is optional if client and server are on the same domain
    baseURL: import.meta.env.VITE_BETTER_AUTH_URL || "http://localhost:3000"
});

export const { useSession, signIn, signUp, signOut } = authClient;