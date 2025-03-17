import { Chunk, PrismaClient, Role } from "@prisma/client";
import { genSaltSync, hashSync } from "bcrypt-ts";

declare global {
  var prisma: PrismaClient | null;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// =========================== Queries ===========================

export async function getUser(email: string) {
  return await db.user.findUnique({ where: { email } });
}

export async function createUser(email: string, password: string) {
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await db.user.create({ data: { email, password: hash } });
}

export async function createMessage({
  chatId,
  content,
  role,
}: {
  chatId: string;
  content: string;
  role: Role;
}) {
  return db.message.create({
    data: {
      content,
      chatId,
      role,
    },
  });
}

export async function getChatsByUser({ email }: { email: string }) {
  return await db.chat.findMany({
    where: { author: email },
    include: {
      messages: {
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getChatById({ id }: { id: string }) {
  return await db.chat.findUnique({
    where: { id },
    include: { messages: true },
  });
}

export async function insertChunks({
  chunks,
}: {
  chunks: (Omit<Chunk, "id"> & { id?: string })[];
}) {
  return await db.chunk.createMany({ data: chunks });
}

export async function getChunksByFilePaths({
  filePaths,
}: {
  filePaths: Array<string>;
}) {
  return await db.chunk.findMany({ where: { filePath: { in: filePaths } } });
}

export async function deleteChunksByFilePath({
  filePath,
}: {
  filePath: string;
}) {
  return await db.chunk.deleteMany({ where: { filePath } });
}
