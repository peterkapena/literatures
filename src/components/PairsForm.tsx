"use client";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Select,
  Typography,
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import { SubmitButton } from "./SubmitButton";
import Checkbox from "@mui/joy/Checkbox";
import Sheet from "@mui/joy/Sheet";
import {
  generatePairForMembers,
  getGroups,
  getMembers,
  intitializeMembers,
} from "../app/partner/generate/_actions";
import { GroupClass, MemberClass } from "@/models/schema/Member";
import Option from "@mui/joy/Option";
import { PairsClass } from "@/models/schema/Pairs";

type PairsFormProps = {
  onSubmit: (pairs: PairsClass) => void;
};
export function PairsForm({ onSubmit }: PairsFormProps) {
  const [checkboxes, setCheckboxes] = React.useState<boolean[]>([]);
  const [members, setMembers] = React.useState<MemberClass[]>([]);
  const [groups, setGroups] = useState<GroupClass[]>([]);

  useEffect(() => {
    fetch();
  }, []);
  async function fetch() {
    await intitializeMembers();
    const grps = await getGroups();
    setGroups(grps);
  }

  function reset() {
    setCheckboxes(checkboxes.map(() => false));
  }

  const toggleMember = (index: number) => () => {
    const newValues = [...checkboxes];
    newValues[index] = !newValues[index];
    setCheckboxes(newValues);
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

  const processForm = async (event: React.SyntheticEvent | null) => {
    event?.preventDefault();

    const attendance = checkboxes
      .filter((c) => c)
      .map((_, i) => members[i].name.toString());
    const pairs = await generatePairForMembers(attendance);
    onSubmit(pairs);
  };

  return (
    <form onSubmit={processForm}>
      {groups.length > 0 && (
        <FormControl size="sm" sx={{ my: 1 }}>
          <FormLabel>Group</FormLabel>
          <Select
            size="sm"
            placeholder="click here to select a group"
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
      {members.length > 0 && (
        <Box>
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
                // textTransform: "uppercase",
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
        </Box>
      )}
    </form>
  );
}
