"use client";
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  ChipDelete,
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  Select,
  Typography,
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import { SubmitButton } from "./SubmitButton";
import Checkbox from "@mui/joy/Checkbox";
import Sheet from "@mui/joy/Sheet";
import {
  addGroup,
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
import { CheckOutlined, InfoRounded } from "@mui/icons-material";
import AlertDialogModal from "./Alert";

type PairsFormProps = {
  onSubmit: (pairs: PairsClass) => void;
};
export function PairsForm({ onSubmit }: PairsFormProps) {
  const [members, setMembers] = React.useState<MemberClass[]>([]);
  const [groups, setGroups] = useState<GroupClass[]>([]);
  const [newMember, setNewMember] = useState<string>("");
  const [newGroup, setNewGroup] = useState<string>("");
  const [groupId, setGroupId] = useState<string>();
  const [selected, setSelected] = React.useState<MemberClass[]>([]);
  const [showDeleteConfirm, setshowDeleteConfirm] = useState<string>();
  const [setshowAddGroupNotice, setsetshowAddGroupNotice] = useState(false);
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

  async function addGrp(_: React.SyntheticEvent) {
    console.log(newGroup);
    if (newGroup) {
      const id = await addGroup(newGroup);
      setNewGroup("");
      setsetshowAddGroupNotice(true);
      setGroupId(id);
      setMembersPerGroup(null, id?.toString() || "");
      await fetch();
    }
  }

  return (
    <Box>
      <Card sx={{ mb: { xs: 2 }, maxWidth: { sm: "50%" } }}>
        <FormControl>
          <FormLabel>Add a group in the platform</FormLabel>
          <Input
            value={newGroup}
            onChange={(e) => setNewGroup(e.target.value)}
            placeholder="Add group..."
            endDecorator={
              <Button color="success" onClick={addGrp}>
                Add a group
              </Button>
            }
          ></Input>
        </FormControl>
        {setshowAddGroupNotice && (
          <AlertDialogModal
            message="Group has been added. Add a member to generate pairs."
            type="notice"
            onClose={() => setsetshowAddGroupNotice(false)}
            onYes={() => setsetshowAddGroupNotice(false)}
          ></AlertDialogModal>
        )}
      </Card>
      {groups.length > 0 && (
        <Box
          sx={{
            display: "flex",
            my: 1,
            gap: 1,
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "start", sm: "" },
            flexWrap: "wrap",
            justifyContent: "",
          }}
        >
          <FormControl size="sm" sx={{ width: "300px" }}>
            <FormLabel>Group</FormLabel>
            <Select
              size="md"
              value={groupId}
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
          <FormControl>
            <FormLabel>Add a member to this group</FormLabel>
            <Input
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
              placeholder="Add a member..."
              endDecorator={
                <Button color="success" onClick={addMbr}>
                  Add
                </Button>
              }
            ></Input>
          </FormControl>
        </Box>
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
            <Box sx={{ my: 1 }}>
              <form onSubmit={processForm}>
                <Alert
                  startDecorator={<InfoRounded color="primary" />}
                  sx={{
                    mb: 1,
                  }}
                >
                  <div>
                    <Typography level="h4">Note</Typography>
                    <List>
                      <ListItem>
                        Please select the members in attendance by clicking on a
                        name below.
                      </ListItem>
                      <ListItem>
                        Once done, click the 'Submit' button to generate pairs
                      </ListItem>
                      <ListItem>
                        Use the 'x' button on the right to remove members no
                        longer in this group.
                      </ListItem>
                    </List>
                  </div>
                </Alert>
                <Typography level="h3" id="fav-movie" mb={2}>
                  Members
                </Typography>
                <Box sx={{ my: 2 }}>
                  <FormControl sx={{ width: "300px" }}>
                    <FormLabel>Add a member to this group</FormLabel>
                    <Input
                      value={newMember}
                      onChange={(e) => setNewMember(e.target.value)}
                      placeholder="Add a member..."
                      endDecorator={
                        <Button color="success" onClick={addMbr}>
                          Add
                        </Button>
                      }
                    ></Input>
                  </FormControl>
                </Box>
                <Alert
                  role="group"
                  aria-labelledby="fav-movie"
                  sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
                >
                  {members.map((member) => {
                    const checked = selected.includes(member);
                    return (
                      <Chip
                        sx={{ mx: 0.5 }}
                        key={member._id?.toString() || ""}
                        variant="soft"
                        color={checked ? "warning" : "neutral"}
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
                          color={checked ? "warning" : "neutral"}
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
                </Alert>
                <Typography sx={{ mt: 3 }} level="body-sm" color="primary">
                  {selected.length} Selected
                </Typography>
                <Box sx={{ my: 1 }}>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => setSelected([])}
                  >
                    Clear selection
                  </Button>
                </Box>
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
