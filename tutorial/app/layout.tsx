import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "From Zero to GenLayer — How I Built 4 AI dApps Without Being a Developer",
  description: "A complete beginner tutorial on building Intelligent Contract games on GenLayer. No coding background needed. Written by Temmygabriel.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
