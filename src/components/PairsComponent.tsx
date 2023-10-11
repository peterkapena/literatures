"use client";
import {
  Box,
  Chip,
  Grid,
  ListDivider,
  ListItemDecorator,
  Typography,
} from "@mui/joy";
import React from "react";
import Avatar from "@mui/joy/Avatar";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
// import { SaveButton } from "@/components/SaveButton";
// import { savePairs } from "@/app/partner/generate/_actions";
import AlertDialogModal from "./Alert";
import { MemberClass } from "@/models/schema/Member";

type PairsComponentProps = {
  generatedPairs: {
    list: [MemberClass, MemberClass][];
    oddMember?: MemberClass | null;
  };
};
export function PairsComponent({
  generatedPairs,
}: PairsComponentProps): React.ReactNode {
  const [setshowSaveDialog, setSetshowSaveDialog] = React.useState(false);

  // async function onSave(event: React.SyntheticEvent) {
  //   event.preventDefault();
  //   if (await savePairs(generatedPairs)) {
  //     setSetshowSaveDialog(true);
  //   }
  // }
  return (
    <Box>
      <Grid container sx={{ flexGrow: 1 }}>
        {generatedPairs.list.map((m, i) => (
          <Grid key={i} xs={6} sm={3} md={3}>
            <List
              variant="outlined"
              sx={{
                m: 1,
                px: 1,
              }}
            >
              <ListItem sx={{}}>
                <ListItemDecorator>
                  <Avatar size="sm" />
                </ListItemDecorator>
                {m[0].name}
              </ListItem>
              <ListDivider inset={"gutter"} />
              <ListItem>
                <ListItemDecorator>
                  <Avatar size="sm" />
                </ListItemDecorator>
                {m[1].name}
              </ListItem>
            </List>
          </Grid>
        ))}
        {generatedPairs.oddMember && (
          <Grid xs={6} sm={4} md={4}>
            <Chip
              variant="outlined"
              color="warning"
              size="lg"
              startDecorator={<Avatar size="sm" />}
            >
              {generatedPairs.oddMember.name}
            </Chip>
          </Grid>
        )}
      </Grid>
      <div>
        <Typography sx={{ mt: 3 }} level="body-sm" color="primary">
          {generatedPairs.list.length} generated
        </Typography>
        {/* <form onSubmit={onSave}>
          <SaveButton />
        </form> */}
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
