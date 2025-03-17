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

export default async function RegisterPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create new account</CardTitle>
        <CardDescription>
          Register using your email and password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm action="register" />
      </CardContent>
      <CardFooter>
        <p className="text-center text-sm text-muted-foreground">
          {"Already have an account? Login "}
          <Link
            href="/login"
            className={
              (cn(buttonVariants({ variant: "link" })), "font-semibold px-0")
            }
          >
            here
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  );
}
