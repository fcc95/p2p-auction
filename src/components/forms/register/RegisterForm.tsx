import { Formik, Form, Field } from "formik";

import { initialValues, validationSchema, type FormValues } from "./schema";
import Input from "../../shared/Input";
import Button from "../../shared/Button";

type IProps = {
  onSubmit: (values: FormValues) => void;
  isSubmitting: boolean;
};

const RegisterForm = ({ onSubmit, isSubmitting }: IProps) => {
  const handleSubmit = async (values: FormValues) => {
    await onSubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="mt-8 space-y-6">
          <div className="space-y-4">
            <Field name="name">
              {({ field, form }: any) => (
                <Input
                  label="First Name"
                  name="name"
                  type="text"
                  placeholder="Enter your first name"
                  required
                  field={field}
                  form={form}
                />
              )}
            </Field>

            <Field name="surname">
              {({ field, form }: any) => (
                <Input
                  label="Last Name"
                  name="surname"
                  type="text"
                  placeholder="Enter your last name"
                  required
                  field={field}
                  form={form}
                />
              )}
            </Field>
          </div>

          <div>
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              text={isSubmitting ? "Creating Account..." : "Create Account"}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
