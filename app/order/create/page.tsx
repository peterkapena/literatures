"use client";
import { Alert, Box, Grid, IconButton, Typography } from "@mui/joy";
import React, { useState } from "react";
import Button from "@mui/joy/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, FormSchemaType, ValidationResult } from "./form-schema";
import { createOrder } from "./_actions";
import TextField from "@/components/TextField";
import TextArea from "@/components/TextArea";
import with_auth from "@/app/with_auth";
import { useSession } from "next-auth/react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const NewOrder = () => {
  const [result, setResult] = useState<ValidationResult>();
  const { data: session } = useSession();
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const { push } = useRouter();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const processForm: SubmitHandler<FormSchemaType> = async (data) => {
    const result = await createOrder(data, (session as any)?.id);

    if (!result) {
      console.log("Something went wrong");
      return;
    }
    setShowSubmitButton(false);
    reset();
    setResult(result);
  };
  return (
    <Box
      sx={{
        maxWidth: "900px",
        mx: "auto", // margin left & right
        my: 4, // margin top & bottom
        py: 3, // padding top & bottom
        px: 2, // padding left & right
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "sm",
        boxShadow: "md",
      }}
    >
      <div>
        <Typography sx={{ textAlign: "center" }} level="h4" component="h1">
          <b>Submit an order</b>
        </Typography>
      </div>
      <form onSubmit={handleSubmit(processForm)}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          // columns={{ xs: "auto", sm: 2, md: 12 }}
          sx={{ flexGrow: 1 }}
        >
          <Grid xs={12} sm={8} md={8} key={5}>
            <TextField
              disabled={Boolean(!showSubmitButton && result)}
              label={"Literature details (title, year, edition, etc..)"}
              fieldName="literature"
              placeholder="Literature"
              register={register}
              fieldError={errors.literature}
              type="text"
            ></TextField>
          </Grid>
          <Grid xs={12} sm={4} md={4} key={4}>
            <TextField
              disabled={Boolean(!showSubmitButton && result)}
              label={"Quantity"}
              fieldName="quantity"
              placeholder="Quantity"
              register={register}
              fieldError={errors.quantity}
              type="number"
            ></TextField>
          </Grid>
          <Grid xs={12} sm={12} md={12} key={3}>
            <TextArea
              disabled={Boolean(!showSubmitButton && result)}
              register={register}
              fieldError={errors.notes}
              fieldName="notes"
              label="Notes"
              minRows={4}
              maxRows={20}
              maxLength={700}
            ></TextArea>
          </Grid>
        </Grid>
        {showSubmitButton && (
          <Box display={"flex"} justifyContent={"space-around"}>
            <Button
              type="button"
              onClick={() => router.back()}
              sx={{ mt: 3 }}
              variant="plain"
              startDecorator={<ArrowBack />}
            >
              Return
            </Button>
            <Button type="submit" sx={{ mt: 3 }}>
              Submit
            </Button>
          </Box>
        )}
        {!showSubmitButton && result?.success && (
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
                    onClick={() => {
                      push("/order/edit/" + result._id);
                    }}
                    sx={{ m: 2, mb: 0, px: 1, pb: 0.5 }}
                  >
                    Go to it
                  </IconButton>
                  <IconButton
                    variant="solid"
                    color={"success"}
                    sx={{ m: 2, mb: 0, px: 1, pb: 0.5 }}
                    onClick={() => setShowSubmitButton(true)}
                  >
                    Submit another
                  </IconButton>
                </Box>
              }
            >
              <div>
                <div>{"Success"}</div>
                <Typography level="body-sm" color={"success"}>
                  Order has been submitted.
                </Typography>
              </div>
            </Alert>
          </Box>
        )}
      </form>
    </Box>
  );
};

export default with_auth(NewOrder);
