import "./globals.scss";
import { Inter as FontSans } from "next/font/google";
import { JetBrains_Mono as FontMono } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
