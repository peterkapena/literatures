"use server";
import ProfileService from "@/service/profile.service";

import { ProfileFormSchemaType } from "./form-schema";

export async function createProfile(data: ProfileFormSchemaType) {
  await new ProfileService().updateProfile({
    cell: data.cell,
    firstName: data.firstName,
    lastName: data.lastName,
    _id: "",
    userId: "",
  });
}
