"use server";

import { signIn } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { AuthInputType, LoginReturnType, authSchema } from "@/schema";

const handler = async ({
  email,
  password,
}: AuthInputType): Promise<LoginReturnType> => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { data: { status: "success" } };
  } catch (error) {
    return { error: { status: "failed" } };
  }
};

export default createSafeAction(authSchema, handler);
