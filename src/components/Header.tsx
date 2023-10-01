"use client";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Sheet from "@mui/joy/Sheet";
import IconButton from "@mui/joy/IconButton";
import ColorSchemeToggle from "./ColorSchemeToggle";
import { Box, Avatar, Typography, Button } from "@mui/joy";
import { signOut, useSession } from "next-auth/react";
import { APP_NAME } from "@/utils/constants";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const { push } = useRouter();

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
        styles={() => ({
          ":root": {
            "--Header-height": "52px",
          },
        })}
      />
      {session?.user ? (
        <>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Avatar
              sx={{ cursor: "pointer" }}
              onClick={() => {
                push("/");
              }}
              variant="outlined"
              src={session?.user.image || ""}
            />
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography fontSize="sm" fontWeight="lg">
                {session?.user.name}
              </Typography>
              <Typography level="body-xs">{session?.user.email}</Typography>
            </Box>
            <IconButton variant="plain" color="neutral">
              <i data-feather="log-out" />
            </IconButton>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Button
                type="button"
                variant="outlined"
                size="sm"
                onClick={() => signOut()}
              >
                Sign out
              </Button>
            </Box>
          </Box>
          <ColorSchemeToggle />
        </>
      ) : (
        <>
          <Typography>{APP_NAME}</Typography>
        </>
      )}
    </Sheet>
  );
}
