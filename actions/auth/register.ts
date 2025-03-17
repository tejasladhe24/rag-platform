"use server";

import { signIn } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { createUser, getUser } from "@/lib/db";
import { AuthInputType, RegisterReturnType, authSchema } from "@/schema";

const handler = async ({
  email,
  password,
}: AuthInputType): Promise<RegisterReturnType> => {
  let user = await getUser(email);
  try {
    if (user) {
      return { status: "user_exists" } as RegisterReturnType;
    }

    await createUser(email, password);
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { status: "success" } as RegisterReturnType;
  } catch (error) {
    return { error: { status: "failed" } };
  }
};

export default createSafeAction(authSchema, handler);
