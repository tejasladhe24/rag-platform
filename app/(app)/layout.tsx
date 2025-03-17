import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { ModalProvider } from "@/components/provider/modal-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await auth();

  if (!data?.user) {
    return null;
  }

  return (
    <SidebarProvider
      defaultOpen={false}
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <AppSidebar user={data?.user} />
      <SidebarInset>{children}</SidebarInset>
      <ModalProvider />
    </SidebarProvider>
  );
}
