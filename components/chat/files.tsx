"use client";

import { cn, fetcher } from "@/lib/utils";
import cx from "classnames";
import { motion } from "framer-motion";
import {
  Info,
  Loader2,
  Square,
  SquareCheck,
  Trash,
  Upload,
} from "lucide-react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import useSWR from "swr";
import { useOnClickOutside, useWindowSize } from "usehooks-ts";
import { Button } from "../ui/button";

export const Files = ({
  selectedFilePathnames,
  setSelectedFilePathnames,
  setIsFilesVisible,
}: {
  selectedFilePathnames: string[];
  setSelectedFilePathnames: Dispatch<SetStateAction<string[]>>;
  setIsFilesVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [uploadQueue, setUploadQueue] = useState<Array<string>>([]);
  const [deleteQueue, setDeleteQueue] = useState<Array<string>>([]);
  const {
    data: files,
    mutate,
    isLoading,
  } = useSWR<
    Array<{
      pathname: string;
    }>
  >("api/files/list", fetcher, {
    fallbackData: [],
  });

  const { width } = useWindowSize();
  const isDesktop = width > 768;

  const drawerRef = useRef<HTMLDivElement>(null);

  // @ts-ignore
  useOnClickOutside([drawerRef], () => {
    setIsFilesVisible(false);
  });

  const onDeleteFile = async (file: any) => {
    setDeleteQueue((currentQueue) => [...currentQueue, file.pathname]);

    await fetch(`/api/files/delete?fileurl=${file.url}`, {
      method: "DELETE",
    });

    setDeleteQueue((currentQueue) =>
      currentQueue.filter((filename) => filename !== file.pathname)
    );

    setSelectedFilePathnames((currentSelections) =>
      currentSelections.filter((path) => path !== file.pathname)
    );
  };

  return (
    <motion.div
      className="fixed bg-zinc-900/50 h-dvh w-dvw top-0 left-0 z-40 flex flex-row justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={cx(
          "fixed p-4 flex flex-col gap-4 bg-primary-foreground z-30",
          { "w-dvw h-96 bottom-0 right-0": !isDesktop },
          { "w-[600px] h-96 rounded-lg": isDesktop }
        )}
        initial={{
          y: "100%",
          scale: isDesktop ? 0.9 : 1,
          opacity: isDesktop ? 0 : 1,
        }}
        animate={{ y: "0%", scale: 1, opacity: 1 }}
        exit={{
          y: "100%",
          scale: isDesktop ? 0.9 : 1,
          opacity: isDesktop ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
        ref={drawerRef}
      >
        <div className="flex flex-row justify-between items-center">
          <div className="text-sm flex flex-row gap-3 text-muted-foreground">
            Manage Knowledge Base
          </div>

          <input
            name="file"
            ref={inputFileRef}
            type="file"
            required
            className="opacity-0 pointer-events-none w-1"
            accept="application/pdf"
            multiple={false}
            onChange={async (event) => {
              const file = event.target.files![0];

              if (file) {
                setUploadQueue((currentQueue) => [...currentQueue, file.name]);

                await fetch(`/api/files/upload?filename=${file.name}`, {
                  method: "POST",
                  body: file,
                });

                setUploadQueue((currentQueue) =>
                  currentQueue.filter((filename) => filename !== file.name)
                );

                mutate([...(files || []), { pathname: file.name }]);
              }
            }}
          />

          <Button
            onClick={() => {
              inputFileRef.current?.click();
            }}
          >
            <Upload />
            <div>Upload a file</div>
          </Button>
        </div>

        <div className="flex flex-col h-full overflow-y-scroll">
          {isLoading ? (
            <div className="flex flex-col gap-4 items-center justify-center h-full">
              <div className="flex flex-row gap-2 items-center text-sm">
                <Loader2 className="animate-spin" />
              </div>
            </div>
          ) : null}

          {!isLoading &&
          files?.length === 0 &&
          uploadQueue.length === 0 &&
          deleteQueue.length === 0 ? (
            <div className="flex flex-col gap-4 items-center justify-center h-full">
              <div className="flex flex-row gap-2 items-center text-sm">
                <Info />
                <div>No files found</div>
              </div>
            </div>
          ) : null}

          {files?.map((file: any) => (
            <div
              key={file.pathname}
              className={cn(
                "flex flex-row p-2 border-b text-sm",
                selectedFilePathnames.includes(file.pathname)
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <div
                className="flex flex-row items-center justify-between w-full gap-4"
                onClick={() => {
                  setSelectedFilePathnames((currentSelections) => {
                    if (currentSelections.includes(file.pathname)) {
                      return currentSelections.filter(
                        (path) => path !== file.pathname
                      );
                    } else {
                      return [...currentSelections, file.pathname];
                    }
                  });
                }}
              >
                <div
                  className={cx(
                    "cursor-pointer",
                    selectedFilePathnames.includes(file.pathname) &&
                      !deleteQueue.includes(file.pathname)
                      ? "text-blue-600 dark:text-zinc-50"
                      : "text-zinc-500"
                  )}
                >
                  {deleteQueue.includes(file.pathname) ? (
                    <div className="animate-spin">
                      <Loader2 />
                    </div>
                  ) : selectedFilePathnames.includes(file.pathname) ? (
                    <SquareCheck />
                  ) : (
                    <Square />
                  )}
                </div>

                <div className="flex flex-row justify-between w-full">
                  {file.pathname}
                </div>
              </div>

              <Button
                size={"icon"}
                variant={"destructive"}
                onClick={() => {
                  onDeleteFile(file);
                  mutate(files.filter((f) => f.pathname !== file.pathname));
                }}
              >
                <Trash />
              </Button>
            </div>
          ))}

          {uploadQueue.map((fileName) => (
            <div
              key={fileName}
              className="flex flex-row justify-between p-2 gap-4 items-center"
            >
              <div className="text-zinc-500">
                <div className="animate-spin">
                  <Loader2 />
                </div>
              </div>

              <div className="flex flex-row justify-between w-full">
                <div className="text-sm">{fileName}</div>
              </div>

              <div className="h-[24px] w-2" />
            </div>
          ))}
        </div>

        <div className="flex flex-row justify-end">
          <div className="text-sm">
            {`${selectedFilePathnames.length}/${files?.length}`} Selected
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
