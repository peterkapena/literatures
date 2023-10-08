"use server";

function getRandomMember(arr: string[]): string {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr.splice(randomIndex, 1)[0];
}

export async function generatePairForMembersOnlyForAttending(
  members: string[]
): Promise<[string, string][]> {
  const remainingMembers = [...members];
  const newPairs: [string, string][] = [];

  while (remainingMembers.length >= 2) {
    const member1 = getRandomMember(remainingMembers);
    const member2 = getRandomMember(remainingMembers);

    newPairs.push([member1, member2]);
  }

  return newPairs;
}
