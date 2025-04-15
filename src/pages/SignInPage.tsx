
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function SignInPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Welcome back!",
      description: "You have successfully signed in.",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8 border rounded-lg shadow-sm">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Welcome back</h2>
          <p className="text-muted-foreground mt-2">Please sign in to continue</p>
        </div>
        <form onSubmit={handleSignIn} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email address"
                required
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                required
                className="w-full"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="text-primary hover:text-primary/80">
                  Forgot your password?
                </a>
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
        <div className="text-center text-sm mt-4">
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <a href="#" className="text-primary hover:text-primary/80 font-medium">
              Sign up
            </a>
          </p>
          <div className="mt-4">
            <Link to="/" className="text-sm text-primary hover:text-primary/80">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
