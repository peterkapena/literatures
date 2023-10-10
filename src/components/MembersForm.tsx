"use client";
import {
  Box,
  Button,
  Chip,
  ChipDelete,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Select,
  Typography,
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import { SubmitButton } from "./SubmitButton";
import Checkbox from "@mui/joy/Checkbox";
import Sheet from "@mui/joy/Sheet";
import {
  addMember,
  deleteMember,
  generatePairForMembers,
  getGroups,
  getMembers,
  intitializeMembers,
} from "../app/partner/generate/_actions";
import { GroupClass, MemberClass } from "@/models/schema/Member";
import Option from "@mui/joy/Option";
import { PairsClass } from "@/models/schema/Pairs";
import { CheckOutlined, InfoOutlined } from "@mui/icons-material";
import AlertDialogModal from "./Alert";

type PairsFormProps = {
  onSubmit: (pairs: PairsClass) => void;
};
export function PairsForm({ onSubmit }: PairsFormProps) {
  const [members, setMembers] = React.useState<MemberClass[]>([]);
  const [groups, setGroups] = useState<GroupClass[]>([]);
  const [newMember, setNewMember] = useState<string>();
  const [groupId, setGroupId] = useState<string>();
  const [selected, setSelected] = React.useState<MemberClass[]>([]);
  const [showDeleteConfirm, setshowDeleteConfirm] = useState<string>();

  useEffect(() => {
    fetch();
  }, []);
  async function fetch() {
    await intitializeMembers();
    const grps = await getGroups();
    setGroups(grps);
  }

  async function setMembersPerGroup(
    _: React.SyntheticEvent | null,
    newValue: string | null
  ) {
    if (newValue) {
      setGroupId(newValue);
      const mbrs = await getMembers(newValue);
      setMembers(mbrs);
    }
  }

  const processForm = async (event: React.SyntheticEvent) => {
    event?.preventDefault();
    if (selected.length > 2) {
      const pairs = await generatePairForMembers(selected);
      onSubmit(pairs);
    }
  };

  async function addMbr(_: React.SyntheticEvent) {
    console.log(newMember);
    if (groupId && newMember) {
      await addMember(groupId, newMember);
      await setMembersPerGroup(null, groupId);
      setNewMember("");
    }
  }

  return (
    <Box>
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
            <Box sx={{ display: "flex", justifyContent: "start", my: 2 }}>
              <Grid container sx={{ flexGrow: 1 }}>
                <Grid xs={5} sm={4} md={2}>
                  <Chip
                    variant="outlined"
                    color="warning"
                    onClick={() => setSelected([])}
                  >
                    Clear selection
                  </Chip>
                </Grid>
                <Grid xs={7} sm={4} md={10}>
                  <Box sx={{ mx: 1 }}>
                    <Input
                      onChange={(e) => setNewMember(e.target.value)}
                      placeholder="Add a member..."
                      startDecorator={<InfoOutlined />}
                      endDecorator={
                        <Button color="success" onClick={addMbr}>
                          Add
                        </Button>
                      }
                    ></Input>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Divider></Divider>

            <Box sx={{ display: "flex", gap: 1, alignItems: "center", my: 2 }}>
              <form onSubmit={processForm}>
                <Typography level="title-lg" id="fav-movie" mb={2}>
                  Members
                </Typography>
                <Typography
                  id="member"
                  level="title-md"
                  sx={{
                    color: "text.secondary",
                    my: 2,
                  }}
                >
                  Please select those that are in attendance. The "X" button at
                  the right may be used to remove members that are no longer in
                  this group.
                </Typography>
                <Box
                  role="group"
                  aria-labelledby="fav-movie"
                  sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
                >
                  {members.map((member) => {
                    const checked = selected.includes(member);
                    return (
                      <Chip
                        sx={{ mx: 0.5 }}
                        key={member.name.toString()}
                        variant="plain"
                        color={checked ? "success" : "neutral"}
                        endDecorator={
                          <ChipDelete
                            onDelete={() => {
                              if (member._id)
                                setshowDeleteConfirm(member._id?.toString());
                            }}
                          />
                        }
                        startDecorator={
                          checked && (
                            <CheckOutlined
                              sx={{ zIndex: 1, pointerEvents: "none" }}
                            />
                          )
                        }
                      >
                        <Checkbox
                          variant="outlined"
                          color={checked ? "primary" : "neutral"}
                          disableIcon
                          overlay
                          label={member.name}
                          checked={checked}
                          onChange={(event) => {
                            setSelected((members) =>
                              !event.target.checked
                                ? members.filter((n) => n._id !== member._id)
                                : [...members, member]
                            );
                          }}
                        />
                      </Chip>
                    );
                  })}
                </Box>
                <Typography sx={{ mt: 3 }} level="body-sm" color="primary">
                  {selected.length} Selected
                </Typography>
                <SubmitButton></SubmitButton>
              </form>
            </Box>
          </Sheet>
          {showDeleteConfirm && (
            <AlertDialogModal
              type="confirm"
              message="Please confirm"
              onClose={() => setshowDeleteConfirm("")}
              onYes={async () => {
                await deleteMember(showDeleteConfirm);
                if (groupId) await setMembersPerGroup(null, groupId);
                setshowDeleteConfirm("");
              }}
            ></AlertDialogModal>
          )}
        </Box>
      )}
    </Box>
  );
}
