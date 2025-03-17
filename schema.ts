import z from "zod";
import { ActionState } from "./lib/create-safe-action";

// ==================== Auth ====================
export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export interface AuthActionState {
  login: {
    status: "idle" | "in_progress" | "success" | "failed";
  };
  register: {
    status: "idle" | "in_progress" | "success" | "failed" | "user_exists";
  };
}

export type AuthInputType = z.infer<typeof authSchema>;
export type LoginReturnType = ActionState<
  AuthInputType,
  AuthActionState["login"]
>;
export type RegisterReturnType = ActionState<
  AuthInputType,
  AuthActionState["register"]
>;

// ==================== Upload Files ====================
export const uploadFileSchema = z.object({
  file: z.instanceof(Blob, { message: "Invalid file format" }),
});

export type UploadFileInputType = z.infer<typeof uploadFileSchema>;
