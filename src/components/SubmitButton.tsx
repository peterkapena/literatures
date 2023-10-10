"use client";
import { Box } from "@mui/joy";
import React from "react";
import Button from "@mui/joy/Button";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";

type SubmitButtonProps = {
  showReturn?: boolean;
};
export function SubmitButton({
  showReturn: hideReturn = true,
}: SubmitButtonProps): React.ReactNode {
  const router = useRouter();
  return (
    <Box display={"flex"} justifyContent={"space-around"}>
      {hideReturn && (
        <Button
          type="button"
          onClick={() => router.back()}
          sx={{ mt: 3 }}
          variant="plain"
          startDecorator={<ArrowBack />}
        >
          Return
        </Button>
      )}
      <Button type="submit" sx={{ mt: 3 }}>
        Submit
      </Button>
    </Box>
  );
}
