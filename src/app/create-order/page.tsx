"use client";
import { Box, FormHelperText, Typography } from "@mui/joy";
import React, { FormEvent, useState } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, FormSchemaType } from "./form-schema";
import { addEntry } from "./_actions";
import { InfoOutlined } from "@mui/icons-material";

const NewOrder = () => {
  const [data, setData] = useState<FormSchemaType>();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const form = event.currentTarget;
  //   const formData = new FormData(form);
  //   const formDataObject = Object.fromEntries(formData);

  //   const d = await fetch("/api/form", {
  //     method: "POST",
  //     body: JSON.stringify(formDataObject),
  //   }).then((response) => response.json());

  //   setData(d);
  //   form.reset();
  // };

  const processForm: SubmitHandler<FormSchemaType> = async (data) => {
    const result = await addEntry(data);

    if (!result) {
      console.log("Something went wrong");
      return;
    }

    if (result.error) {
      // set local error state
      console.log(result.error);
      return;
    }

    reset();
    setData(result.data);
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
        <Typography level="h4" component="h1">
          <b>Submit an order</b>
        </Typography>
      </div>
      <form onSubmit={handleSubmit(processForm)}>
        <FormControl>
          <FormLabel>
            {"Literature details (title, year, edition, etc..)"}
          </FormLabel>
          <Input
            // html input attribute
            type="text"
            placeholder="Literature"
            autoComplete=""
            {...register("literature")}
            error={Boolean(errors.literature?.message)}
          />
          {errors.literature?.message && (
            <FormHelperText>
              <InfoOutlined />
              {errors.literature.message}
            </FormHelperText>
          )}
        </FormControl>
        <Button type="submit" sx={{ mt: 1 /* margin top */ }}>
          Submit
        </Button>
      </form>
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </Box>
  );
};

export default NewOrder;
