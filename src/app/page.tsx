"use client";
import * as React from "react";
import { Box, CircularProgress, Typography } from "@mui/joy";
import OrderList from "@/components/OrderList";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();
  // console.log(session);
  if (!(session?.user as any)?.id) return <CircularProgress></CircularProgress>;

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
      </Box>
      {/* <OrderTablex userId={(session?.user as any)?.id} /> */}
      <OrderList userId={(session?.user as any)?.id}/>
    </Box>
  );
};
export default Page;
