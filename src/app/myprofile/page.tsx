"use client";
import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useSession } from "next-auth/react";
import { useState } from "react";

function page() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || '');

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleSave = () => {
    if (session && session.user){
      session.user.name = name;
    }
  };

  return (
    <div>
      {session?.user?.name && (
        <Box
          sx={{
            flex: 1,
            width: "100%",
          }}
        >
          <Stack
            spacing={4}
            sx={{
              display: "flex",
              maxWidth: "800px",
              mx: "auto",
              px: {
                xs: 2,
                md: 6,
              },
              py: {
                xs: 2,
                md: 3,
              },
            }}
          >
            <Card>
              <Box sx={{ mb: 1 }}>
                <Typography level="title-md">Personal info</Typography>
                <Typography level="body-sm">
                  Customize your profile information.
                </Typography>
              </Box>
              <Divider />
              <Stack
                direction="row"
                spacing={3}
                sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
              >
                <Stack direction="column" spacing={1}>
                  <AspectRatio
                    ratio="1"
                    maxHeight={200}
                    sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
                  >
                    <img src="" srcSet="" loading="lazy" alt="" />
                  </AspectRatio>
                  <IconButton
                    aria-label="upload new picture"
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    sx={{
                      bgcolor: "background.body",
                      position: "absolute",
                      zIndex: 2,
                      borderRadius: "50%",
                      left: 100,
                      top: 170,
                      boxShadow: "sm",
                    }}
                  >
                    <EditRoundedIcon />
                  </IconButton>
                </Stack>
                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                  <Stack spacing={1}>
                    <FormLabel>Name</FormLabel>
                    <FormControl
                      sx={{
                        display: {
                          sm: "flex-column",
                          md: "flex-row",
                        },
                        gap: 2,
                      }}
                    >
                      <Input 
                        size="sm" 
                        placeholder="First name" 
                        value={name}
                        onChange={handleNameChange}
                      />
                      <Input
                        size="sm"
                        placeholder="Last name"
                        sx={{ flexGrow: 1 }}
                        value={name}
                      />
                    </FormControl>

                    <FormLabel>Cell Number</FormLabel>
                    <FormControl
                      sx={{
                        display: {
                          sm: "flex-column",
                          md: "flex-row",
                        },
                        gap: 2,
                      }}
                    >
                      <Input
                        size="sm"
                        placeholder="Cell Number"
                        sx={{ flexGrow: 1 }}
                      />
                    </FormControl>
                  </Stack>
                </Stack>
              </Stack>

              <Box display={"flex"} justifyContent={"space-around"}>
                <Button type="button" sx={{ mt: 3 }} variant="plain" size="md">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  sx={{ mt: 3 }}
                  variant="outlined"
                  size="md"
                  color="success"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </Box>
            </Card>
          </Stack>
        </Box>
      )}
    </div>
  );
}

export default page;
