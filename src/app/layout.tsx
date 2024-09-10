// app/layout.tsx
// Global layout for the entire app that applies to all pages within its directory

import { ReactNode } from "react";
import "../styles/globals.css";
import Navbar from "@/components/Navbar/navbar";
import Footer from "@/components/Footer/footer";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";

export const metadata = {
  title: "GhostLink",
  description: "Upload and manage your files.",
  icons: [
    {
      rel: "icon",
      url: "/ghostLogoPurple.png",
      sizes: "16x16", // Specify the size
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body>
          <Navbar />
          {children}
          <Footer />

          {/* Google Analytics */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </body>
      </ClerkProvider>
    </html>
  );
}
