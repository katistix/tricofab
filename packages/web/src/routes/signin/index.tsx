import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/signin/")({
    component: SignInPage,
});

function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data, error } = await authClient.signIn.email({
            email,
            password,
        });

        if (error) {
            alert(error.message);
        } else {
            navigate({ to: "/" });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
            <form onSubmit={handleSignIn} className="p-8 border rounded-lg shadow-md w-full max-w-sm space-y-4">
                <h1 className="text-2xl font-bold">Sign In</h1>
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <Button type="submit" className="w-full">Sign In</Button>
            </form>
        </div>
    );
}