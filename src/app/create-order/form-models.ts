import { FormFieldModel } from "@/utils";
import * as yup from "yup";

export type CreateOrderFormModel = {
  formId: string;
  formFields: CreateOrderFormFieldsModel;
};

export type CreateOrderFormFieldsModel = {
  literature: FormFieldModel;
  quantity: FormFieldModel;
  notes: FormFieldModel;
};

export const CreateOrderFormModel = {
  formId: "CreateOrderForm",
  formFields: {
    literature: {
      label: "Literature details (language, edition, etc...)",
      name: "literature",
    },
    quantity: {
      label: "Quantity",
      name: "quantity",
    },
    notes: {
      label: "Notes",
      name: "notes",
    },
  },
};

export const CreateOrderFormInitialValues = () => {
  return {
    [CreateOrderFormModel.formFields.literature.name]: "",
    [CreateOrderFormModel.formFields.quantity.name]: 0,
    [CreateOrderFormModel.formFields.notes.name]: "",
  } as CreateOrderFormValueModel;
};

export type CreateOrderFormValueModel = {
  literature: string;
  quantity: number;
  notes: string;
};

export const CreateOrderFormValidationSchema = yup.object({
  [CreateOrderFormModel.formFields.literature.name]: yup
    .string()
    .required("required"),
  [CreateOrderFormModel.formFields.quantity.name]: yup
    .number()
    .required("required"),
  [CreateOrderFormModel.formFields.notes.name]: yup.string(),
});
