"use client";

import login from "@/actions/auth/login";
import register from "@/actions/auth/register";
import { useAction } from "@/hooks/use-action";
import { AuthInputType, authSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

export const AuthForm = ({ action }: { action: "login" | "register" }) => {
  const form = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();

  const onSuccess = () => {
    form.reset();
    router.refresh();
  };

  const onError = ({ status }: { status: string }) => {
    toast.error(status);
  };

  const { execute: executeLogin } = useAction(login, { onSuccess, onError });
  const { execute: executeRegister } = useAction(register, {
    onSuccess,
    onError,
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: AuthInputType) => {
    if (action === "login") await executeLogin(values);
    else await executeRegister(values);
  };

  if (action === "login")
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="acme@example.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            Login
            {isLoading && <Loader2 className="animate-spin" />}
          </Button>
        </form>
      </Form>
    );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input placeholder="acme@example.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          Register
          {isLoading && <Loader2 className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};
