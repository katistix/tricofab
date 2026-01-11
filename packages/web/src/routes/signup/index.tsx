import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute('/signup/')({
    component: RouteComponent,
})

function RouteComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data, error } = await authClient.signUp.email({
            email,
            password,
            name,
            callbackURL: "/",
        });

        if (error) {
            alert(error.message);
        } else {
            navigate({ to: "/" });
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
            <form onSubmit={handleSignUp} className="p-8 border rounded-lg shadow-md w-full max-w-sm space-y-4">
                <h1 className="text-2xl font-bold">Create Account</h1>
                <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <Button type="submit" className="w-full">Sign Up</Button>
            </form>
        </div>
    );
}



