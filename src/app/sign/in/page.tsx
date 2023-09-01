"use client";
import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import GoogleIcon from "@/components/GoogleIcon";
import { signIn } from "next-auth/react";

export default function JoySignInSideTemplate() {
  return (
    <>
      <Box
        sx={(theme) => ({
          width:
            "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(255 255 255 / 0.6)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width:
              "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
            maxWidth: "100%",
            px: 2,
          }}
        >
          <Box>
            <Button
              variant="outlined"
              color="neutral"
              fullWidth
              onClick={() => signIn("google", { callbackUrl: "/" })}
              startDecorator={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
