"use client";
import { Sheet } from "@mui/joy";
import React from "react";

export default function ResetPassword() {

    const { push } = useRouter();
  const { data: session } = useSession();

  return (
    <Sheet
      sx={{
        mt: 2,
        width: 500,
        mx: "auto",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "sm",
        boxShadow: "md",
      }}
      variant="outlined"
    >
      <form ></form>
    </Sheet>
  );
}
