"use client";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import ColorSchemeToggle from "@/components/ColorSchemeToggle";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sheet, Typography, Alert, IconButton } from "@mui/joy";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { FormSchema, FormSchemaType } from "./form-schema";
import { IS_DEVELOPER } from "@/common";
import TextField from "@/components/TextField";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Password from "@/components/Password";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Page() {
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [messages, setMessages] = useState<string[]>([]);
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email_or_username: IS_DEVELOPER ? "peterkapenapeter@gmail.com" : "",
      password: IS_DEVELOPER ? "0FROEFNSUlCQ2dLQ0FRRUFrUG5wTDJ" : "",
    },
  });

  const processForm: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      const result = await signIn("credentials", {
        email_or_username: data.email_or_username,
        password: data.password,
        redirect: false,
        callbackUrl: "/",
      });
      console.log(result);
      if (result?.error) {
        setShowSubmitButton(false);
        setMessages(["Invalid email or username or password"]);
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      <form onSubmit={handleSubmit(processForm)}>
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
          <div>
            <Typography level="h2" component="h1" sx={{ mb: 2 }}>
              <b>Welcome!</b>
            </Typography>
            <Typography level="body-md">Sign in to continue.</Typography>
          </div>
          <div>
            <ColorSchemeToggle />
          </div>
        </Box>
        <TextField
          disabled={Boolean(!showSubmitButton)}
          label={"Email or username"}
          fieldName="email_or_username"
          placeholder="johndoe@example.com"
          register={register}
          fieldError={errors.email_or_username}
          type="text"
        ></TextField>
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
            onClick={() => push("/auth/signup")}
          >
            Do not have an account? Click here to create one.
          </Button>
        </Box>
        {showSubmitButton && (
          <Button fullWidth type="submit" sx={{ mt: 1 /* margin top */ }}>
            Sign in
          </Button>
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
              startDecorator={<CheckCircleIcon />}
              variant="soft"
              color={"success"}
              endDecorator={
                <Box sx={{ display: { xs: "inline-grid", sm: "flex" } }}>
                  <IconButton
                    variant="solid"
                    color={"success"}
                    sx={{ m: 2, mb: 0, px: 1, pb: 0.5 }}
                    onClick={() => setShowSubmitButton(true)}
                  >
                    X
                  </IconButton>
                </Box>
              }
            >
              <div>
                <div>{"Success"}</div>
                <Typography level="body-sm" color={"success"}>
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
