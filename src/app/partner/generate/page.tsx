"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormLabel,
  ListDivider,
  ListItemContent,
  ListItemDecorator,
  Select,
  Table,
  Typography,
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../../../components/SubmitButton";
import Avatar from "@mui/joy/Avatar";
import Checkbox from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Sheet from "@mui/joy/Sheet";
import {
  generatePairForMembers,
  getGroups,
  getMembers,
  intitializeMembers,
} from "./_actions";
import { GroupClass, MemberClass } from "@/models/schema/Member";
import Option from "@mui/joy/Option";
import { accordionDetailsClasses } from "@mui/joy/AccordionDetails";
import { accordionSummaryClasses } from "@mui/joy/AccordionSummary";
import {
  EditNotificationsRounded,
  TapAndPlayRounded,
} from "@mui/icons-material";

const NewOrder = () => {
  const [generatedPairs, setNewPairs] = useState<{
    pairs: [string, string][];
    oddMember: string | null;
  }>();

  const [members, setMembers] = React.useState<MemberClass[]>([]);
  const [checkboxes, setCheckboxes] = React.useState<boolean[]>([]);
  const [groups, setGroups] = useState<GroupClass[]>([]);
  const [index, setIndex] = React.useState<number | null>(0);

  async function fetch() {
    await intitializeMembers();
    const grps = await getGroups();
    setGroups(grps);
  }

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    setCheckboxes(members.map((_, i) => i < 2));
  }, [members]);

  const toggleMember = (index: number) => () => {
    const newValues = [...checkboxes];
    newValues[index] = !newValues[index];
    setCheckboxes(newValues);
  };

  const processForm = async (event: React.SyntheticEvent | null) => {
    event?.preventDefault();

    const attendance = checkboxes
      .filter((c) => c)
      .map((_, i) => members[i].name.toString());
    const pairs = await generatePairForMembers(attendance);
    setNewPairs(pairs);
    setIndex(1);
  };
  async function setMembersPerGroup(
    _: React.SyntheticEvent | null,
    newValue: string | null
  ) {
    if (newValue) {
      const mbrs = await getMembers(newValue);
      setMembers(mbrs);
    }
  }
  function reset() {
    setCheckboxes(checkboxes.map(() => false));
  }

  return (
    <Box
      sx={{
        mx: "auto", // margin left & right
        maxWidth: "100%",
        my: 4, // margin top & bottom
        py: 3, // padding top & bottom
        // px: 2, // padding left & right
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "sm",
        // boxShadow: "md",
      }}
    >
      <AccordionGroup
        variant="plain"
        transition="0.2s"
        sx={{
          maxWidth: "100%",
          borderRadius: "md",
          [`& .${accordionDetailsClasses.content}.${accordionDetailsClasses.expanded}`]:
            {
              paddingBlock: "1rem",
            },
          [`& .${accordionSummaryClasses.button}`]: {
            paddingBlock: "1rem",
          },
        }}
      >
        <Accordion
          expanded={index === 0}
          onChange={(_, expanded) => {
            setIndex(expanded ? 0 : null);
          }}
        >
          <AccordionSummary>
            <Avatar color="success">
              <TapAndPlayRounded />
            </Avatar>
            <ListItemContent>
              <Typography level="title-md">Generate</Typography>
              <Typography level="body-sm">
                Generate field service partners
              </Typography>
            </ListItemContent>
          </AccordionSummary>
          <AccordionDetails>
            {groups.length > 0 && (
              <FormControl size="sm" sx={{ my: 1 }}>
                <FormLabel>Group</FormLabel>
                <Select
                  size="sm"
                  placeholder="Select a group"
                  slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
                  onChange={setMembersPerGroup}
                >
                  {groups.map((g) => (
                    <Option key={g._id?.toString()} value={g._id?.toString()}>
                      {g.name}
                    </Option>
                  ))}
                </Select>
              </FormControl>
            )}

            <form onSubmit={processForm}>
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
                    mb: 3,
                  }}
                >
                  Please select those that are in attendance
                </Typography>
                <Divider></Divider>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, my: 3 }}>
                  {members.map((m, index) => (
                    <Checkbox
                      key={index}
                      name={index.toString()}
                      label={m.name}
                      checked={checkboxes[index] || false} // Ensure checked is always defined
                      onChange={toggleMember(index)}
                      color="success"
                      sx={{ color: "inherit" }}
                    />
                  ))}
                </Box>
                <Button
                  variant="outlined"
                  size="sm"
                  type="button"
                  onClick={reset}
                  sx={{ px: 1.5, mt: 3 }}
                >
                  Clear All. Total
                </Button>

                <Typography sx={{ mt: 3 }} level="body-sm" color="primary">
                  {checkboxes.filter((c) => c).length} Selected
                </Typography>
              </Sheet>
              <SubmitButton></SubmitButton>
            </form>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={index === 1}
          onChange={(event, expanded) => {
            setIndex(expanded ? 1 : null);
          }}
        >
          <AccordionSummary>
            <Avatar color="primary">
              <EditNotificationsRounded />
            </Avatar>
            <ListItemContent>
              <Typography level="title-md">The pairs</Typography>
              <Typography level="body-sm">
                The generated field service partners.
              </Typography>
            </ListItemContent>
          </AccordionSummary>
          <AccordionDetails>
            {generatedPairs && (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 4,
                  }}
                >
                  {generatedPairs.pairs.map((m, i) => (
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
                            <Avatar size="sm" />
                          </ListItemDecorator>
                          {m[0]}
                        </ListItem>
                        <ListDivider inset={"gutter"} />
                        <ListItem>
                          <ListItemDecorator>
                            <Avatar size="sm" />
                          </ListItemDecorator>
                          {m[1]}
                        </ListItem>
                      </List>
                    </div>
                  ))}
                  {generatedPairs.oddMember && (
                    <Chip
                      variant="outlined"
                      color="neutral"
                      size="lg"
                      startDecorator={<Avatar size="sm" />}
                      onClick={() => alert("You clicked the Joy Chip!")}
                    >
                      {generatedPairs.oddMember}
                    </Chip>
                  )}
                </Box>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
    </Box>
  );
};

export default NewOrder;
