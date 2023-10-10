"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Box,
  ListItemContent,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";
import Avatar from "@mui/joy/Avatar";
import { accordionDetailsClasses } from "@mui/joy/AccordionDetails";
import { accordionSummaryClasses } from "@mui/joy/AccordionSummary";
import {
  EditNotificationsRounded,
  TapAndPlayRounded,
} from "@mui/icons-material";
import { PairsClass } from "@/models/schema/Pairs";
import { PairsComponent } from "../../../components/PairsComponent";
import { PairsForm } from "../../../components/MembersForm";

const NewOrder = () => {
  const [generatedPairs, setNewPairs] = useState<PairsClass>();

  const [index, setIndex] = React.useState<number | null>(0);

  function onSubmit(pairs: PairsClass) {
    setNewPairs(pairs);
    setIndex(1);
  }

  return (
    <Box
      sx={{
        mx: "auto",
        maxWidth: "900px",
        my: 4,
        py: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "sm",
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
            <PairsForm onSubmit={onSubmit}></PairsForm>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={index === 1}
          onChange={(_, expanded) => {
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
              <PairsComponent generatedPairs={generatedPairs}></PairsComponent>
            )}
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
    </Box>
  );
};

export default NewOrder;
