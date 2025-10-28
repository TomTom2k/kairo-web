import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kairo",
  description: "Kairo Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
