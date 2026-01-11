import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { getSession } from "@/lib/auth-functions";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  loader: async () => {
    const session = await getSession();
    return { session };
  },
  component: Home,
});

function Home() {
  const { session } = Route.useLoaderData();
  const navigate = useNavigate();

  // client-side hook for reactive updates (e.g., after signout)
  const { data: clientSession } = authClient.useSession();

  // Use the loader data initially, fall back to client state
  const user = clientSession?.user || session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    navigate({ to: "/signin" });
  };

  return (
    <div className="p-8 max-w-2xl mx-auto text-center space-y-6">
      <h1 className="text-4xl font-bold">TanStack + Better Auth</h1>

      {user ? (
        <div className="p-6 border rounded-xl bg-card">
          <p className="text-lg">Welcome back, <span className="font-bold text-primary">{user.name}</span>!</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <Button variant="outline" className="mt-4" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-muted-foreground">You are not signed in.</p>
          <div className="flex justify-center gap-4">
            <Button><Link to="/signin">Sign In</Link></Button>
            <Button variant="outline"><Link to="/signup">Sign Up</Link></Button>
          </div>
        </div>
      )}
    </div>
  );
}