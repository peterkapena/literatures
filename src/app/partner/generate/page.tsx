"use client";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  ListDivider,
  ListItemDecorator,
  Typography,
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@/components/TextField";
import TextArea from "@/components/TextArea";
import { useSession } from "next-auth/react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../../../components/SubmitButton";
import Avatar from "@mui/joy/Avatar";
import Checkbox, { checkboxClasses } from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Sheet from "@mui/joy/Sheet";
import { FormSchema, FormSchemaType } from "./form-schema";
import { generatePairForMembersOnlyForAttending } from "./_actions";

const ms: { name: string; present: boolean }[] = [
  { name: "Rex", present: false },
  { name: "William", present: false },
  { name: "Marcelus", present: false },
  { name: "Peter", present: false },
  { name: "Selwyn", present: false },
  { name: "Tamryn", present: false },
  { name: "Rene", present: false },
  { name: "Janice", present: false },
  { name: "Michel", present: false },
  { name: "Chantel", present: false },
  { name: "Kiara", present: false },
  { name: "Faith", present: true },
];

const NewOrder = () => {
  // const [result, setResult] = useState<ValidationResult>();
  const { data: session } = useSession();
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [newPairs, setNewPairs] = useState<[string, string][]>([]);
  const { push } = useRouter();
  const [members, setMembers] = React.useState(ms);

  async function fetchOrders() {
    const pairs = await generatePairForMembersOnlyForAttending(
      ms.map((m) => m.name)
    );
    setNewPairs(pairs);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleMember = (index: number) => () => {
    const newMembers = [...members];
    newMembers[index].present = !newMembers[index].present;
    setMembers(newMembers);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const processForm: SubmitHandler<FormSchemaType> = async (data) => {
    console.log(data);
  };
  return (
    <Box
      sx={{
        mx: "auto", // margin left & right
        minWidth: "50%",
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
      <div>
        <Typography sx={{ textAlign: "center" }} level="h4" component="h1">
          <b>Generate field service partners</b>
        </Typography>
      </div>
      <form onSubmit={handleSubmit(processForm)}>
        <Sheet
          variant="outlined"
          sx={{
            p: 2,
            borderRadius: "sm",
          }}
        >
          <Typography
            id="member"
            sx={{
              textTransform: "uppercase",
              letterSpacing: "lg",
              fontWeight: "lg",
              color: "text.secondary",
              mb: 2,
            }}
          >
            Members
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            {members.map((m, index) => (
              // <>
              //   <input
              //     type="checkbox"
              //     id={`member-${index}`}
              //     {...register(`members.${index}.present`)}
              //   />
              //   <label htmlFor={`member-${index}`}>{m.name}</label>
              // </>
              <Checkbox
                key={index}
                {...register(`members.${index}.name`)}
                label={m.name}
                checked={m.present}
                onChange={toggleMember(index)}
                color="success"
                sx={{ color: "inherit" }}
              />
            ))}
          </Box>
          {errors.members && <p>{errors.members.message}</p>}
          <Button
            variant="outlined"
            color="neutral"
            size="sm"
            onClick={() => reset()}
            sx={{ px: 1.5, mt: 1 }}
          >
            Clear All
          </Button>
        </Sheet>
        {/* <Button type="submit" sx={{ mt: 3 }}>
          Submit
        </Button> */}
        {showSubmitButton && <SubmitButton></SubmitButton>}
        {/* {!showSubmitButton && result?.success && (
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
                <Box sx={{ display: { xs: "inline-grid", sm: "flex" } }}>
                  <IconButton
                    variant="solid"
                    color={"success"}
                    onClick={() => {
                      push("/order/edit/" + result._id);
                    }}
                    sx={{ m: 2, mb: 0, px: 1, pb: 0.5 }}
                  >
                    Go to it
                  </IconButton>
                  <IconButton
                    variant="solid"
                    color={"success"}
                    sx={{ m: 2, mb: 0, px: 1, pb: 0.5 }}
                    onClick={() => setShowSubmitButton(true)}
                  >
                    Submit another
                  </IconButton>
                </Box>
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
        )} */}
      </form>
      {newPairs.length > 0 && (
        <Box>
          <Typography
            sx={{ textAlign: "center", mb: 2 }}
            level="h4"
            component="h1"
          >
            <b>The generated partners</b>
          </Typography>{" "}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 4,
            }}
          >
            {newPairs.map((m, i) => (
              <div key={i}>
                <List
                  variant="outlined"
                  sx={{
                    minWidth: 240,
                    borderRadius: "sm",
                  }}
                >
                  <ListItem>
                    <ListItemDecorator>
                      <Avatar size="sm" src="/static/images/avatar/1.jpg" />
                    </ListItemDecorator>
                    {m[0]}
                  </ListItem>
                  <ListDivider inset={"gutter"} />
                  <ListItem>
                    <ListItemDecorator>
                      <Avatar size="sm" src="/static/images/avatar/2.jpg" />
                    </ListItemDecorator>
                    {m[1]}
                  </ListItem>
                </List>
              </div>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default NewOrder;
