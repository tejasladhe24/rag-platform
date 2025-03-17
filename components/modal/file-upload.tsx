"use client";

import { useModal } from "@/hooks/use-modal";
import { UploadFileInputType, uploadFileSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

export const FileUploadModal = () => {
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { onClose, isOpen, type } = useModal();

  const isModalOpen = isOpen && type === "file-upload";

  const form = useForm({
    resolver: zodResolver(uploadFileSchema),
  });

  const onSubmit = async (data: UploadFileInputType) => {
    console.log("Submitted data:", data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (file) {
      const blob = new Blob([file], { type: file.type });
      console.log("file", blob); // Update the form value with the blob
    }
  };

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="p-0">
        <DialogHeader className="flex flex-row items-center p-4 gap-4 justify-between">
          <DialogTitle>Manage knowledge base</DialogTitle>
          <Form {...form}>
            <form className="flex items-center">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <Button
                      type="button"
                      onClick={() => inputRef.current?.click()}
                      variant={"outline"}
                      size={"icon"}
                    >
                      <Plus />
                    </Button>
                    <FormControl>
                      <Input
                        ref={inputRef}
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </DialogHeader>
        <Separator />
      </DialogContent>
    </Dialog>
  );
};
