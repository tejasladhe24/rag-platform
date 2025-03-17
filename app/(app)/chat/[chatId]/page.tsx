import { auth } from "@/auth";
import { Chat as PreviewChat } from "@/components/chat";
import { getChatById } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const { chatId } = await params;
  const chat = await getChatById({ id: chatId });

  if (!chat) {
    notFound();
  }

  const session = await auth();

  if (chat.author !== session?.user?.email) {
    notFound();
  }

  return (
    <PreviewChat
      id={chat.id}
      initialMessages={chat.messages.map((message) => ({
        id: message.id,
        role: message.role,
        content: message.content,
      }))}
      session={session}
    />
  );
}
