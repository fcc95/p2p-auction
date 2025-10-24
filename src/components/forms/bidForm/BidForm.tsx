import { Field, Form, Formik, type FieldProps } from "formik";
import { createValidationSchema } from "./schema";
import Input from "../../shared/Input";
import Button from "../../shared/Button";
import { initialValues } from "./schema";

type BidFormProps = {
  minimumBid: number;
  onSubmit: (amount: number) => void;
};

const BidForm = ({ minimumBid, onSubmit }: BidFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createValidationSchema(minimumBid)}
      onSubmit={(values) => onSubmit(Number(values.bid))}
    >
      {() => (
        <Form className="flex flex-col gap-4">
          <Field name="bid">
            {({ field, form }: FieldProps) => (
              <Input
                label={`Bid Amount (minimum: ${minimumBid} )`}
                name="bid"
                type="number"
                required
                placeholder={minimumBid.toString()}
                field={field}
                form={form}
              />
            )}
          </Field>

          <Button className="cursor-pointer" type="submit" text="Submit Bid" />
        </Form>
      )}
    </Formik>
  );
};

export default BidForm;
