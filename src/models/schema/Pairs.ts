import { getModelForClass, prop } from "@typegoose/typegoose";
import { models } from "mongoose";

export class PairsClass {
  @prop({ required: true })
  list!: [string, string][];
  oddMember?: string | null;
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
