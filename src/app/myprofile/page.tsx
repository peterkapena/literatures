"use client";
import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useSession } from "next-auth/react";
import { useState } from "react";
import TextField from "@/components/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormSchema, FormSchemaType } from "./form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid } from "@mui/joy";

function page() {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const processForm: SubmitHandler<FormSchemaType> = async (data) => {
    console.log(data);
    
    // const result = await createOrder(data, (session as any)?.user.id);
  };
  return (
    <div>
      {session?.user?.name && (
        <Card>
          <div>
            <Typography level="h2">Personal info</Typography>
            <Typography level="body-sm">
              Customize your profile information.
            </Typography>
          </div>
          <form onSubmit={handleSubmit(processForm)}>
            <Divider />

            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              sx={{ flexGrow: 1 }}
            >
              <Grid xs={12} sm={4} md={4} >
                <TextField
                  label={"First name"}
                  fieldName="firstName"
                  placeholder="First name"
                  register={register}
                  fieldError={errors.firstName}
                  type="text"
                ></TextField>
              </Grid>
              <Grid xs={12} sm={4} md={4} >
                <TextField
                  label={"Last name"}
                  fieldName="lastName"
                  placeholder="Last name"
                  register={register}
                  fieldError={errors.lastName}
                  type="text"
                ></TextField>
              </Grid>
              <Grid xs={12} sm={4} md={4} >
                <TextField
                  label={"Cell number"}
                  fieldName="cell"
                  placeholder="Cell number"
                  register={register}
                  fieldError={errors.cell}
                  type="tel"
                ></TextField>
              </Grid>
            </Grid>

            <Box display={"flex"} justifyContent={"space-around"}>
              {/* <Button type="button" sx={{ mt: 3 }} variant="plain" size="md">
                    Cancel
                  </Button> */}
              <Button
                type="submit"
                sx={{ mt: 3 }}
                variant="outlined"
                size="md"
                color="success"
              >
                Save
              </Button>
            </Box>
          </form>
        </Card>

      )}
    </div>
  );
}

export default page;
