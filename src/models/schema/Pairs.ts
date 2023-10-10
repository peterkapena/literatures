import { getModelForClass, prop } from "@typegoose/typegoose";
import { models } from "mongoose";
import { MemberClass } from "./Member";

export class PairsClass {
  @prop({ required: true })
  list!: [MemberClass, MemberClass][];
  oddMember?: MemberClass | null;
}

interface PairsClassSchemaQueryHelpers {}

export const PairsModel =
  models.Pairs ||
  getModelForClass<typeof PairsClass, PairsClassSchemaQueryHelpers>(
    PairsClass,
    {
      options: { customName: "Pairs" },
    }
  );
