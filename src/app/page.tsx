"use client";
import * as React from "react";
import NextLink from "next/link";
import { Box, Button } from "@mui/joy";
import with_auth from "./with_auth";
import OrderTable from "@/components/OrderTable";

const Page = () => {
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
      <OrderTable></OrderTable>
    </Box>
  );
};

export default with_auth(Page);
