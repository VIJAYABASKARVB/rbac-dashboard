import type { Metadata } from "next";
import "./globals.css"

export const metadata: Metadata = {
  title: "Team Access Control",
  description: "RBAC-Dashboard built with Next.js and React",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className="min-h-screen bg-slate-1000 text-slate"
      >
        {children}
      </body>
    </html>
  );
}
