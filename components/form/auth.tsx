"use client";

import login from "@/actions/auth/login";
import register from "@/actions/auth/register";
import { useAction } from "@/hooks/use-action";
import { AuthInputType, authSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  const [showPassword, setShowPassword] = useState(false);

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
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <div className="flex items-center justify-end">
                  <Button
                    type="button"
                    className="p-0"
                    variant={"link"}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword && (
                      <div className="flex items-center gap-2">
                        <EyeOff className="text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Show Password
                        </span>
                      </div>
                    )}
                    {!showPassword && (
                      <div className="flex items-center gap-2">
                        <Eye />
                        <span>Hide Password</span>
                      </div>
                    )}
                  </Button>
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isLoading} className="capitalize">
          {action}
          {isLoading && <Loader2 className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};
