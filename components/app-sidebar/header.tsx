"use client";

import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";

export const NavHeader = ({ title }: { title?: string }) => {
  const { id } = useParams();
  return (
    <header
      className={cn(
        "bg-background p-3 sticky top-0 flex shrink-0 items-center gap-2",
        id && "border-b"
      )}
    >
      {title}
    </header>
  );
};
