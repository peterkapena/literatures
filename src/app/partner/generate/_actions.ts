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
    const ms: { name: string; present: boolean }[] = [
      { name: "Rex", present: false },
      { name: "William", present: false },
      { name: "Marcelus", present: false },
      { name: "Peter", present: false },
      { name: "Selwyn", present: false },
      { name: "Tamryn", present: false },
      { name: "Rene", present: false },
      { name: "Janice", present: false },
      { name: "Michel", present: false },
      { name: "Chantel", present: false },
      { name: "Kiara", present: false },
      { name: "Faith", present: true },
    ];
    let group: GroupClass = { name: "Glenhood - Marcellus" };
    group = await GroupModel.create(group);
    ms.forEach(async (m) => {
      if (group._id) await addMember(group._id, m.name);
    });
  }
}

export async function addMember(groupId: String, name: String) {
  if (groupId) {
    const member: MemberClass = { groupId, name };
    await MemberModel.create(member);
  }
}

export async function getMembers(groupId: String): Promise<MemberClass[]> {
  const members = (await MemberModel.find({ groupId })) as MemberClass[];
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
    const result = await MemberModel.deleteOne({ _id });
    console.log(result);
    return true;
  } catch (error) {
    return false;
  }
}
