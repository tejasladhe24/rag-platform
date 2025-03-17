import { AuthForm } from "@/components/form/auth";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function LoginPage() {
  return (
    <Card className="my-auto">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>
          Use your email and password to sign in
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm action="login" />
      </CardContent>
      <CardFooter>
        <p className="text-center text-sm text-muted-foreground">
          {"Don't have an account? Sign up "}
          <Link
            href="/register"
            className={
              (cn(buttonVariants({ variant: "link" })), "font-semibold px-0")
            }
          >
            here
          </Link>
          {" for free."}
        </p>
      </CardFooter>
    </Card>
  );
}
