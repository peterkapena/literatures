"use client";
import { FormHelperText } from "@mui/joy";
import React, { InputHTMLAttributes } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { FieldError } from "react-hook-form";
import { InfoOutlined } from "@mui/icons-material";

interface TextFieldProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  register: any;
  fieldError: FieldError | undefined;
  fieldName: string;
  label: string;
}

export default function ({
  register,
  fieldError,
  fieldName,
  label,
  type,
  ...rest
}: TextFieldProps) {
  const valueAsNumber = type === "number";
  
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input
        {...register(fieldName, { valueAsNumber })}
        error={Boolean(fieldError?.message)}
        {...rest}
      />
      {fieldError?.message && (
        <FormHelperText>
          <InfoOutlined />
          {fieldError.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}
