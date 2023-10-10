"use client";
import { Box, Chip, ListDivider, ListItemDecorator } from "@mui/joy";
import React from "react";
import Avatar from "@mui/joy/Avatar";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import { PairsClass } from "@/models/schema/Pairs";

type PairsComponentProps = {
  generatedPairs: PairsClass;
};
export function PairsComponent({
  generatedPairs,
}: PairsComponentProps): React.ReactNode {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {generatedPairs.list.map((m, i) => (
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
  );
}
