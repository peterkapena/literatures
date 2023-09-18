"use client";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import ColorSchemeToggle from "@/components/ColorSchemeToggle";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sheet, Typography, Alert, IconButton, CircularProgress } from "@mui/joy";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { FormSchema, FormSchemaType } from "./form-schema";
import { IS_DEVELOPER } from "@/common";
import { signUp } from "./_actions";
import UserName from "@/components/UserName";
import Email from "@/components/Email";
import Password from "@/components/Password";
import { Info } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { SubmitLoadingButton } from "@/components/SubmitLoadingButton";

export default function Page() {
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [messages, setMessages] = useState<string[]>([]);
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: IS_DEVELOPER ? "peterkapenapeter@gmail.com" : "",
      password: IS_DEVELOPER ? "0FROEFNSUlCQ2dLQ0FRRUFrUG5wTDJ" : "",
      username: IS_DEVELOPER ? "peterkapena" : "",
    },
  });

  const processForm: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      setIsLoading(true);
      const ok = await signUp(data.username, data.email, data.password);
      console.log(ok);

      setShowSubmitButton(false);
      if (ok) {
        setMessages([
          ...messages,
          "Sign up was successful. Close this to sign in or login now.",
        ]);
      } else {
        setMessages([...messages, "Sign up failed. Contact support."]);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <Sheet
      sx={{
        mt: 2,
        width: 500,
        mx: "auto", // margin left & right
        p: 2, // padding left & right
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "sm",
        boxShadow: "md",
      }}
      variant="outlined"
    >
      <form onSubmit={handleSubmit(processForm)}>
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
          <div>
            <Typography level="h2" component="h1" sx={{ mb: 2 }}>
              <b>Welcome!</b>
            </Typography>
            <Typography level="body-md">
              Sign up or register your account so to start making literatures'
              order.
            </Typography>
          </div>
          <div>
            <ColorSchemeToggle />
          </div>
        </Box>
        <UserName
          showSubmitButton={showSubmitButton}
          error={errors.username}
          register={register}
        ></UserName>
        <Email
          showSubmitButton={showSubmitButton}
          error={errors.email}
          register={register}
        ></Email>
        <Password
          showSubmitButton={showSubmitButton}
          error={errors.password}
          register={register}
        ></Password>

        <Box
          sx={{
            my: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="plain"
            size="sm"
            onClick={() => push("/auth/signin")}
          >
            Already have an account? Sign in now!
          </Button>
        </Box>
        {showSubmitButton && (
          SubmitLoadingButton(isLoading, "Sign up")
        )}

        {!showSubmitButton && messages.length > 0 && (
          <Box
            sx={{
              display: "flex",
              gap: 2,
              width: "100%",
              flexDirection: "column",
              mt: 3,
            }}
          >
            <Alert
              key={"Success"}
              sx={{ alignItems: "flex-start" }}
              startDecorator={<Info />}
              variant="soft"
              color={"neutral"}
              endDecorator={
                <Box sx={{ display: { xs: "inline-grid", sm: "flex" } }}>
                  <IconButton
                    variant="solid"
                    color={"neutral"}
                    sx={{ m: 2, mb: 0, px: 1, pb: 0.5 }}
                    onClick={() => {
                      setMessages([]);
                      setShowSubmitButton(true);
                    }}
                  >
                    X
                  </IconButton>
                </Box>
              }
            >
              <div>
                <div>{"Success"}</div>
                <Typography level="body-sm" color={"neutral"}>
                  {messages.join("\n")}
                </Typography>
              </div>
            </Alert>
          </Box>
        )}
      </form>
    </Sheet>
  );
}
