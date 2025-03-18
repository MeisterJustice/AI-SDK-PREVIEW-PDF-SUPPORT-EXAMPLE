import "./globals.css";
import { Metadata } from "next";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import PdfSelection from "./(home)/pdf-selection";
import Providers from "@/providers";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-sdk-preview-pdf-support.vercel.app"),
  title: "PDF Support Preview",
  description: "Experimental preview of PDF support with the AI SDK",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.className}`}>
      <body>
        <ThemeProvider attribute="class" enableSystem forcedTheme="dark">
          <Toaster position="top-center" richColors />

          <Providers>
            <main className="container mx-auto px-4 lg:px-8 py-12 transition-all duration-300">
              <div className="flex flex-col xl:flex-row xl:justify-between gap-10 xl:gap-20">
                <div className="xl:w-3/4 flex flex-col gap-10">{children}</div>

                <div className="xl:w-1/4 xl:pt-[60px]">
                  <PdfSelection />
                </div>
              </div>
            </main>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
