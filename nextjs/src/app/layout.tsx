"use client";
import * as React from "react";
import ThemeRegistry from "./ThemeRegistry";
import Header from "@/components/Header";
import { Box } from "@mui/joy";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import Sidebar from "@/components/Sidebar";
import { BreadCrumbs } from "./BreadCrumbs";

interface Props {
  session: Session | null;
  children: React.ReactNode;
}

export default function RootLayout({ children, session }: Props) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <SessionProvider session={session}>
            <Box sx={{ display: "flex", minHeight: "100dvh" }}>
              <Header />
              <Sidebar />
              <Box
                component="main"
                className="MainContent"
                sx={{
                  px: {
                    xs: 2,
                    md: 6,
                  },
                  pt: {
                    xs: "calc(12px + var(--Header-height))",
                    sm: "calc(12px + var(--Header-height))",
                    md: 3,
                  },
                  pb: {
                    xs: 2,
                    sm: 2,
                    md: 3,
                  },
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 0,
                  height: "100dvh",
                  gap: 1,
                }}
              >
                {<BreadCrumbs />}
                {children}
              </Box>
            </Box>
          </SessionProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
