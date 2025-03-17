"use client";

import { fetcher } from "@/lib/utils";
import { Chat, Message } from "@prisma/client";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { Info, Menu, Pencil } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const History = () => {
  const { id } = useParams();
  const pathname = usePathname();

  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const {
    data: history,
    error,
    isLoading,
    mutate,
  } = useSWR<(Chat & { messages: Message[] })[]>("/api/history", fetcher, {
    fallbackData: [],
  });

  useEffect(() => {
    mutate();
  }, [pathname, mutate]);

  return (
    <>
      <div
        className="text-muted-foreground cursor-pointer"
        onClick={() => {
          setIsHistoryVisible(true);
        }}
      >
        <Menu />
      </div>

      <AnimatePresence>
        {isHistoryVisible && (
          <>
            <motion.div
              className="fixed bg-zinc-900/50 h-dvh w-dvw top-0 left-0 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsHistoryVisible(false);
              }}
            />

            <motion.div
              className="fixed top-0 left-0 w-80 h-dvh p-3 flex flex-col gap-6 z-20"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
            >
              <div className="text-sm flex flex-row items-center justify-between">
                <div className="flex flex-row gap-2 text-muted-foreground">
                  <h1>History</h1>
                  <h1>
                    {history === undefined ? "loading" : history.length} chats
                  </h1>
                </div>

                <Link
                  href="/"
                  className="hover:dark:bg-zinc-600 hover:bg-zinc-200 p-1.5 rounded-md cursor-pointer"
                  onClick={() => {
                    setIsHistoryVisible(false);
                  }}
                >
                  <Pencil size={14} />
                </Link>
              </div>

              <div className="flex flex-col overflow-y-scroll">
                {error && error.status === 401 ? (
                  <div className="text-zinc-500 h-dvh w-full flex flex-row justify-center items-center text-sm gap-2">
                    <Info />
                    <div>Login to save and revisit previous chats!</div>
                  </div>
                ) : null}

                {!isLoading && history?.length === 0 && !error ? (
                  <div className="text-zinc-500 h-dvh w-full flex flex-row justify-center items-center text-sm gap-2">
                    <Info />
                    <div>No chats found</div>
                  </div>
                ) : null}

                {isLoading && !error ? (
                  <div className="flex flex-col w-full">
                    {[44, 32, 28, 52].map((item) => (
                      <div
                        key={item}
                        className="p-2 border-b dark:border-zinc-700"
                      >
                        <div className={`w-${item} h-[20px] animate-pulse`} />
                      </div>
                    ))}
                  </div>
                ) : null}

                {history &&
                  history.map((chat) => {
                    const messages = chat.messages;
                    const firstMessage = messages[0];
                    if (!firstMessage) return null;
                    const content = firstMessage.content as string;
                    return (
                      <Link
                        href={`/chat/${chat.id}`}
                        key={chat.id}
                        className={cx(
                          "p-2 dark:text-zinc-400 border-b dark:border-zinc-700 text-sm dark:hover:bg-zinc-700 hover:bg-zinc-200 last-of-type:border-b-0",
                          {
                            "dark:bg-zinc-700 bg-zinc-200": id === chat.id,
                          }
                        )}
                      >
                        {content}
                      </Link>
                    );
                  })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
