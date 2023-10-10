"use client";
import * as React from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/joy";
import OrderList from "@/components/OrderList";
import { useSession } from "next-auth/react";
import { ArticleRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data: session } = useSession();
  if (!(session?.user as any)?.id) return <CircularProgress></CircularProgress>;

  const { push } = useRouter();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          my: 1,
          gap: 1,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "start", sm: "center" },
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h2">Orders</Typography>
        <Button
          color="warning"
          endDecorator={<ArticleRounded />}
          size="md"
          onClick={() => push("/order/create")}
        >
          Submit an order
        </Button>
      </Box>
      <OrderList userId={(session?.user as any)?.id} />
    </Box>
  );
};
export default Page;
