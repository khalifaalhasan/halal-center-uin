import css from "styled-jsx/css";
import { Navbar } from "@/components/layouts/navbar/navbar";
import { Footer } from "@/components/layouts/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
