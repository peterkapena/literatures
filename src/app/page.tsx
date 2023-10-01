"use client";
import * as React from "react";
import NextLink from "next/link";
import { Box, Button, CircularProgress } from "@mui/joy";
import OrderTable from "@/components/OrderTable";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();
  // console.log(session);
  if (!(session?.user as any)?.id) return <CircularProgress></CircularProgress>;

  return (
    <Box
      sx={(theme) => ({
        p: 3,
        minWidth: "50%",
        [theme.breakpoints.down("md")]: {
          minWidth: "85%",
        },
      })}
    >
      <Box sx={{ mb: 5, display: "flex" }}>
        <NextLink href="/order/create">
          <Button fullWidth size="md" color="warning">
            Make an order
          </Button>
        </NextLink>
      </Box>
      <OrderTable userId={(session?.user as any)?.id}></OrderTable>
    </Box>
  );
};

export default Page;
