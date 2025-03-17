"use client";

import { useEffect, useState } from "react";
import { FileUploadModal } from "../modal/file-upload";

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <FileUploadModal />
    </>
  );
};
