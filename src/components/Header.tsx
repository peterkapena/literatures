"use client";
import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Sheet from "@mui/joy/Sheet";
import IconButton from "@mui/joy/IconButton";

import ColorSchemeToggle from "./ColorSchemeToggle";
import { toggleSidebar } from "../utils";
import { Box, Avatar, Typography, Button, Link } from "@mui/joy";

export default function Header() {
  return (
    <Sheet
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        width: "100%",
        height: "var(--Header-height)",
        zIndex: 9995,
        p: 2,
        gap: 1,
        borderBottom: "1px solid",
        borderColor: "background.level1",
        boxShadow: "sm",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Header-height": "52px",
            // [theme.breakpoints.up("md")]: {
            //   "--Header-height": "0px",
            // },
          },
        })}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar variant="outlined" src="" />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography fontSize="sm" fontWeight="lg">
            Siriwat K.
          </Typography>
          <Typography level="body-xs">siriwatk@test.com</Typography>
        </Box>
        <IconButton variant="plain" color="neutral">
          <i data-feather="log-out" />
        </IconButton>
      </Box>
     
      <ColorSchemeToggle id={undefined} />
    </Sheet>
  );
}
