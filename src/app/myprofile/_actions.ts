"use server";
import ProfileService from "@/service/profile.service";
import { ProfileFormSchemaType } from "./form-schema";

export async function updateCreateProfile(
  data: ProfileFormSchemaType,
  userId: string,
  _id: String | undefined
): Promise<string> {
  try {
    const profile = await new ProfileService().updateCreateProfile(
      {
        cell: data.cell,
        firstName: data.firstName,
        lastName: data.lastName,
        userId,
      },
      _id
    );
    return JSON.stringify({
      profile,
      data,
      success: true,
    });
  } catch (error) {
    return "";
  }
}

export async function getProfile(userId: string) {
  const rtn = await new ProfileService().getProfile(userId);
  return JSON.stringify(rtn ?? "{}");
}
