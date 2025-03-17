import { auth } from "@/auth";
import { NavHeader } from "@/components/app-sidebar/header";
import { Chat } from "@/components/chat";
import { generateId } from "ai";

export default async function Page() {
  const session = await auth();
  return (
    <>
      <NavHeader />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Chat id={generateId()} initialMessages={[]} session={session} />
      </div>
    </>
  );
}
