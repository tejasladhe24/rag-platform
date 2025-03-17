import React from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col p-4 justify-center max-w-screen-sm w-full aspect-square">
      {children}
    </div>
  );
}
