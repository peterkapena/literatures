import { prop } from "@typegoose/typegoose";
import base_model from "./base_model";
import { models } from "mongoose";
import { getModelForClass } from "@typegoose/typegoose";

export interface ProfileClassQueryHelpers {}

export default class Profile extends base_model {
  @prop({ required: true, unique: true })
  firstName!: string;

  @prop({ required: true, unique: true })
  lastName!: string;

  @prop({ required: true, unique: true })
  cell!: string;

  @prop()
  userId!: String;
}

const ProfileModel =
  models.Profiles ||
  getModelForClass<typeof Profile, ProfileClassQueryHelpers>(Profile, {
    options: { customName: "Profiles" },
  });

export { ProfileModel, Profile };
