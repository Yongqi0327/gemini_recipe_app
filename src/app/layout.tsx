import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Recipe App",
  description: "An Google Gemini-powered recipe app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-geist p-4">
        {children}
      </body>
    </html>
  );
}
