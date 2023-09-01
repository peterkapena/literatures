"use client";
import { Alert, Box, Chip, Grid, IconButton, Typography } from "@mui/joy";
import React, { useEffect, useState } from "react";
import Button from "@mui/joy/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@/components/TextField";
import TextArea from "@/components/TextArea";
import with_auth, { WithAuthProps } from "@/app/with_auth";
import { useSession } from "next-auth/react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { edit, getOrder } from "../../create/_actions";
import { OrderClass } from "@/models/schema/Order";
import { ArrowBack, DateRangeOutlined, Save } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { FormSchemaType, FormSchema } from "../../create/form-schema";

const NewOrder: React.FC<WithAuthProps> = ({ params: id }) => {
  const [result, setResult] = useState<Boolean>();
  const { data: session } = useSession();
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [order, setOrder] = useState<OrderClass>();
  const router = useRouter();

  useEffect(() => {
    getOrder(id.id).then((strOrder) => {
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
      // quantity: (order && +order?.quantity) ?? 0,
      // notes: order?.notes?.toString() || "",
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
                <Button
                  type="submit"
                  sx={{ mt: 3 }}
                  variant="outlined"
                  startDecorator={<Save />}
                >
                  Save
                </Button>
              </Box>
            )}
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

export default with_auth(NewOrder);
