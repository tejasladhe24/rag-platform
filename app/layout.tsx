import { ThemeProvider } from "@/components/provider/theme-provider";
import { hankenGrotesk } from "@/lib/fonts";
import { baseUrl, cn } from "@/lib/utils";
import { siteConfig } from "@/site-config";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  url: siteConfig.openGraph.url,
  image: siteConfig.openGraph.images[0].url,
  locale: siteConfig.locale,
  metadataBase: new URL(baseUrl),
  robots: {
    follow: true,
    index: true,
  },
  icons: [
    {
      url: "/favicon.png",
      href: "/favicon.png",
    },
  ],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.openGraph.url,
    siteName: siteConfig.title,
    images: [
      {
        url: "/screenshots/mobile-preview.png",
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/screenshots/mobile-preview.png"],
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      "en-IN": baseUrl,
    },
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(hankenGrotesk.className, "antialiased")}>
        <ThemeProvider
          attribute={"class"}
          storageKey="theme"
          defaultTheme="dark"
          enableSystem
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
