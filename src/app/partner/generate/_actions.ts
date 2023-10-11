"use server";

import {
  GroupClass,
  GroupModel,
  MemberClass,
  MemberModel,
} from "@/models/schema/Member";
import { PairsClass, PairsModel } from "@/models/schema/Pairs";

function getRandomMember(arr: MemberClass[]): MemberClass {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr.splice(randomIndex, 1)[0];
}

export async function generatePairForMembers(
  members: MemberClass[]
): Promise<PairsClass> {
  const remainingMembers = [...members];
  const newPairs: [MemberClass, MemberClass][] = [];
  let oddMember: MemberClass | null = null;

  while (remainingMembers.length >= 2) {
    const member1 = getRandomMember(remainingMembers);
    const member2 = getRandomMember(remainingMembers);

    newPairs.push([member1, member2]);
  }

  if (remainingMembers.length === 1) {
    oddMember = remainingMembers[0];
  }
  return { list: newPairs, oddMember };
}

export async function intitializeMembers() {
  if ((await MemberModel.find()).length <= 0) {
    const ms: string[] = [
      "Rex",
      "William",
      "Marcelus",
      "Peter",
      "Selwyn",
      "Tamryn",
      "Rene",
      "Janice",
      "Michel",
      "Chantel",
      "Kiara",
      "Faith",
      "Josephin",
      "Nombulelo",
      "Theresa",
      "Talitha",
    ];
    let groupId = await addGroup("1 Umthi Close Glenwood | Goodwood st");
    ms.forEach(async (m) => {
      if (groupId) await addMember(groupId, m);
    });
  }
}

export async function addGroup(name: string) {
  let group: GroupClass = { name };
  group = (await GroupModel.create(group)) as GroupClass;
  return group._id?.toString();
}

export async function addMember(groupId: String, name: String) {
  if (groupId) {
    const member: MemberClass = { groupId, name };
    await MemberModel.create(member);
  }
}

export async function getMembers(groupId: String): Promise<MemberClass[]> {
  const members = (await MemberModel.find({ groupId }).sort(
    "-when_created"
  )) as MemberClass[];
  return members.map((member) => {
    return {
      _id: member._id?.toString(),
      name: member.name.toString(),
      groupId: member.groupId.toString(), // Assuming groupId is also a complex object
    };
  });
}

export async function getGroups(): Promise<GroupClass[]> {
  return (await GroupModel.find({})).map((g) => {
    const gp: GroupClass = { name: g.name, _id: g._id.toString() };
    return gp;
  });
}

export async function savePairs(pairs: {
  list: [MemberClass, MemberClass][];
  oddMember?: MemberClass | null;
}): Promise<boolean> {
  try {
    await PairsModel.create(pairs);
    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteMember(_id: String): Promise<boolean> {
  try {
    await MemberModel.deleteOne({ _id });
    return true;
  } catch (error) {
    return false;
  }
}
