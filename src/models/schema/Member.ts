import { getModelForClass, prop } from "@typegoose/typegoose";
import { models } from "mongoose";

interface GroupClassSchemaQueryHelpers {}

export class GroupClass {
  _id?: String;
  @prop({ required: true })
  name!: String;
}
export const GroupModel =
  models.Group ||
  getModelForClass<typeof GroupClass, GroupClassSchemaQueryHelpers>(
    GroupClass,
    {
      options: { customName: "Group" },
    }
  );
export class MemberClass {
  _id?: String;
  @prop({ required: true })
  name!: String;
  @prop({ required: true })
  groupId!: String;
}

interface MemberClassSchemaQueryHelpers {}

export const MemberModel =
  models.Member ||
  getModelForClass<typeof MemberClass, MemberClassSchemaQueryHelpers>(
    MemberClass,
    {
      options: { customName: "Member" },
    }
  );
