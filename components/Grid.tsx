import * as React from "react";
import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import { Input } from "@mui/joy";

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.background.level1 : "#fff",
  ...theme.typography["body-sm"],
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

export default function ResponsiveGrid() {
  return (
    <Grid container spacing={3}>
      <Grid xs={12} sm={12} md={4}>
        <Input placeholder="dsdsd" size="md" variant="outlined" />
      </Grid>
      <Grid xs={12} sm={12} md={4}>
        <Input placeholder="dsdsd" size="md" variant="outlined" />
      </Grid>
    </Grid>
  );
}
