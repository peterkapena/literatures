import "@fontsource/inter";
import ColorSchemeToggle from "@/components/ColorSchemeToggle";
import Header from "@/components/Header";
import OrderTable from "@/components/OrderTable";
import SecondSidebar from "@/components/SecondSidebar";
// import theme from "@/theme";
import { Box, CssVarsProvider, Typography } from "@mui/joy";
import Button from "@mui/joy/Button";
import Head from "next/head";

export default function ButtonUsage() {
  return (
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      <Header />
      <SecondSidebar />
      <Box
        component="main"
        className="MainContent"
        sx={{
          px: {
            xs: 2,
            md: 6,
          },
          pt: {
            xs: "calc(12px + var(--Header-height))",
            sm: "calc(12px + var(--Header-height))",
            md: 3,
          },
          pb: {
            xs: 2,
            sm: 2,
            md: 3,
          },
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          height: "100dvh",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ColorSchemeToggle
            sx={{ ml: "auto", display: { xs: "none", md: "inline-flex" } }}
          />
        </Box>
        <div>
          {" "}
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
          {/* <OrderTable /> */}
        </div>
      </Box>
    </Box>
  );
}
