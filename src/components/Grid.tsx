import * as React from "react";
import Grid from "@mui/joy/Grid";
import { Input } from "@mui/joy";

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
