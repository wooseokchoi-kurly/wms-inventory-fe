import "./globals.css";
import { Inter } from "next/font/google";
import InventoryAppBar from "./layout/InventoryAppBar";
import InventoryFooter from "@/app/layout/InventoryFooter";
import React from "react";
import { Container } from "@mui/system";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <InventoryAppBar />
        <Container disableGutters={true} maxWidth={false}>
          <div style={{ margin: "50px" }}>{children}</div>
        </Container>
        <InventoryFooter />
      </body>
    </html>
  );
}
