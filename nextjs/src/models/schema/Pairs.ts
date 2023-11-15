import { getModelForClass, pre, prop } from "@typegoose/typegoose";
import { models } from "mongoose";
import { MemberClass } from "./Member";

@pre<PairsClass>("save", function () {
  this.when_created = new Date().toISOString();
})
export class PairsClass {
  @prop({ required: true })
  list!: [MemberClass, MemberClass][];
  oddMember?: MemberClass | null;
  @prop()
  when_created?: String;
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
