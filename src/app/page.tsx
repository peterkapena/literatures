"use client";
import * as React from "react";
import { Alert, Box, Button, CircularProgress, Typography } from "@mui/joy";
import { useSession } from "next-auth/react";
import { ArticleRounded, InfoRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data: session } = useSession();
  const { push } = useRouter();

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
        <Typography level="h2">Welcome!</Typography>
        <Button
          color="warning"
          endDecorator={<ArticleRounded />}
          size="md"
          onClick={() => push("/order/create")}
        >
          Submit an order
        </Button>
      </Box>
      <Box
        sx={{ display: "flex", gap: 2, maxWidth: {sm:"50%"}, flexDirection: "column" }}
      >
        <Alert
          variant="outlined"
          startDecorator={<InfoRounded color="primary" />}
        >
          <div>
            <div>What is this?</div>
            <Typography level="body-sm">
              This platform is essentially for usage at your local congregation
              to facilitate some adminitrative tasks. It can be used to submit
              literature orders instead of doing it from the kingdom hall desk
              and having your order forgotten..
            </Typography>
          </div>
        </Alert>
        <Alert
          variant="outlined"
          startDecorator={<InfoRounded color="primary" />}
        >
          <div>
            <div>What else?</div>
            <Typography level="body-sm">
              The platform can also be used to generate field service partners
              in your respective groups.
            </Typography>
          </div>
        </Alert>
      </Box>
    </Box>
  );
};
export default Page;
