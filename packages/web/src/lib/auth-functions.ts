import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth";

export const getSession = createServerFn({ method: "GET" }).handler(async () => {
    const headers = getRequestHeaders();
    // We pass headers so Better Auth can find the session cookie
    const session = await auth.api.getSession({
        headers,
    });
    return session;
});

export const signOutServer = createServerFn({ method: "POST" }).handler(async () => {
    // Usually, sign out is handled better on the client with authClient.signOut()
    // but having a server-side redirect or cleanup can be useful.
    return { success: true };
});