"use client";
import Button from "@mui/joy/Button";
import { CircularProgress } from "@mui/joy";

export function SubmitLoadingButton(isLoading: boolean, title: string) {
  return <Button
    disabled={isLoading}
    fullWidth
    type="submit"
    sx={{ mt: 1 /* margin top */ }}
    endDecorator={isLoading && ( //The circular check progress when Signing in.
      <CircularProgress
        color="primary"
        size="sm"
        value={25}
        variant="plain" />
    )}
  >
    {title}
  </Button>;
}
