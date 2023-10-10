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
          color="success"
          variant="outlined"
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
          color="success"
          variant="outlined"
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
