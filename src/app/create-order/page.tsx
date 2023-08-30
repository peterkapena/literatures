"use client";
import { FormikHelpers, useFormik } from "formik";
import {
  CreateOrderFormInitialValues,
  CreateOrderFormValidationSchema,
  CreateOrderFormValueModel,
  CreateOrderFormModel,
} from "./form-models";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  Typography,
} from "@mui/joy";
import { InfoOutlined } from "@mui/icons-material";
import { Submitting } from "@/Submitting";
const NewOrder = () => {
  const formik = useFormik<CreateOrderFormValueModel>({
    initialValues: CreateOrderFormInitialValues(),
    validationSchema: CreateOrderFormValidationSchema,
    onSubmit: _handleSubmit,
  });

  async function _handleSubmit(
    values: CreateOrderFormValueModel,
    actions: FormikHelpers<any>
  ) {
    actions.setSubmitting(true);
    try {
      if (formik.isValid) {
        console.log(values)
      }
    } catch (e) {}
    actions.setSubmitting(false);
  }
  const { formFields, formId } = CreateOrderFormModel;

  return (
    <div>
      <Typography variant="plain" level={"h1"}>
        Submit an order
      </Typography>
      <form id={formId} onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormLabel>{formFields.literature.label}</FormLabel>
          <Input
            id={formFields.literature.name}
            type="text"
            placeholder="!"
            fullWidth
            error={
              formik.touched.literature && Boolean(formik.errors.literature)
            }
          />
          <FormHelperText>
            {<InfoOutlined /> &&
              formik.touched.literature &&
              formik.errors.literature}
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>{formFields.notes.label}</FormLabel>
          <Input
            id={formFields.notes.name}
            type="text"
            placeholder="Notes"
            fullWidth
            error={formik.touched.notes && Boolean(formik.errors.notes)}
          />
          <FormHelperText>
            {<InfoOutlined /> && formik.touched.notes && formik.errors.notes}
          </FormHelperText>
        </FormControl>
        <Button
          color="primary"
          variant="outlined"
          fullWidth
          type="submit"
          disabled={formik.isSubmitting}
          size="sm"
        >
          {formik.isSubmitting ? <Submitting></Submitting> : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default NewOrder;
