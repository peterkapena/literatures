"use client";
import {
  Box,
  Card,
  CardContent,
  Chip,
  ListDivider,
  ListItemDecorator,
  Typography,
} from "@mui/joy";
import React from "react";
import Avatar from "@mui/joy/Avatar";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import { SaveButton } from "@/app/order/edit/[id]/SaveButton";
import { savePairs } from "@/app/partner/generate/_actions";
import AlertDialogModal from "./Alert";

type PairsComponentProps = {
  generatedPairs: {
    list: [string, string][];
    oddMember?: string | null;
  };
};
export function PairsComponent({
  generatedPairs,
}: PairsComponentProps): React.ReactNode {
  const [setshowSaveDialog, setSetshowSaveDialog] = React.useState(false);

  async function onSave(event: React.SyntheticEvent) {
    event.preventDefault();
    if (await savePairs(generatedPairs)) {
      setSetshowSaveDialog(true);
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        p: 2,
      }}
    >
      <Card sx={{ minWidth: "100%" }}>
        <CardContent orientation="horizontal">
          {generatedPairs.list.map((m, i) => (
            <div key={i}>
              <List
                variant="outlined"
                sx={{
                  maxWidth: 250,
                  borderRadius: "sm",
                  px: 1,
                }}
              >
                <ListItem sx={{}}>
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
            <Box>
              <Chip
                variant="outlined"
                color="warning"
                size="lg"
                startDecorator={<Avatar size="sm" />}
                onClick={() => alert("You clicked the Joy Chip!")}
              >
                {generatedPairs.oddMember}
              </Chip>
            </Box>
          )}
        </CardContent>
      </Card>
      <div>
        <Typography level="body-xs">Total </Typography>
        <Typography fontSize="lg" fontWeight="lg">
          {generatedPairs.list.length * 2 + (generatedPairs.oddMember ? 1 : 0)}
        </Typography>
        <form onSubmit={onSave}>
          <SaveButton />
        </form>
      </div>
      {setshowSaveDialog && (
        <AlertDialogModal
          message="Pairs have been saved"
          onClose={() => {
            setSetshowSaveDialog(false);
          }}
          onYes={() => {}}
          type="notice"
        ></AlertDialogModal>
      )}
    </Box>
  );
}
