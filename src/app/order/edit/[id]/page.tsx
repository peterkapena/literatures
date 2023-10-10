"use client";
import { Alert, Box, Chip, Grid, IconButton, Typography } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@/components/TextField";
import TextArea from "@/components/TextArea";
import { useSession } from "next-auth/react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { edit, getOrder } from "../../create/_actions";
import { OrderClass } from "@/models/schema/Order";
import { DateRangeOutlined } from "@mui/icons-material";
import { FormSchemaType, FormSchema } from "../../create/form-schema";
import { SaveButton } from "./SaveButton";

const NewOrder = ({ params }: { params: { id: string } }) => {
  const [result, setResult] = useState<Boolean>();
  const { data: session } = useSession();
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [order, setOrder] = useState<OrderClass>();

  useEffect(() => {
    getOrder(params.id).then((strOrder) => {
      const _order: OrderClass = JSON.parse(strOrder);
      setOrder(_order);
    });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      literature: order?.literature.toString(),
    },
  });

  const processForm: SubmitHandler<FormSchemaType> = async (data) => {
    const result = await edit(
      data,
      (session as any)?.id,
      order?._id?.toString()
    );

    if (result) {
      setShowSubmitButton(false);
      const or: OrderClass = {
        literature: data.literature,
        quantity: data.quantity,
        notes: data.notes,
        userId: order?.userId || "",
        when_created: order?.when_created || "",
        _id: order?._id,
      };
      setOrder(or);
      reset();
      setResult(result);
    } else {
      alert("Something went wrong");
      return;
    }
  };

  return (
    <Box>
      <Typography level="h3">Editing order</Typography>
      {order?._id ? (
        <Box>
          <div>
            <Typography sx={{ textAlign: "center" }} level="h4" component="h1">
              <Box
                sx={{ mb: 2, display: "flex", justifyContent: "flex-start" }}
              >
                <Typography level="body-md" sx={{ mr: 1 }}>
                  Submitted on
                </Typography>
                <Chip
                  color="success"
                  variant="outlined"
                  endDecorator={<DateRangeOutlined fontSize="medium" />}
                >
                  {order?.when_created &&
                    new Date(order?.when_created?.toString()).toLocaleString()}
                </Chip>
              </Box>
            </Typography>
          </div>
          <form onSubmit={handleSubmit(processForm)}>
            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ flexGrow: 1 }}>
              <Grid xs={12} sm={8} md={8} key={5}>
                <TextField
                  disabled={Boolean(!showSubmitButton && result)}
                  defaultValue={order.literature.toString()}
                  label={"Literature"}
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
                  defaultValue={+order.quantity}
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
                  defaultValue={order?.notes?.toString()}
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
            {showSubmitButton && <SaveButton />}
            {!showSubmitButton && result && (
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
                    <IconButton
                      variant="soft"
                      color={"success"}
                      onClick={() => setShowSubmitButton(true)}
                    >
                      <CloseRoundedIcon />
                    </IconButton>
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
      ) : (
        <Box>Loading...</Box>
      )}
    </Box>
  );
};

export default NewOrder;
