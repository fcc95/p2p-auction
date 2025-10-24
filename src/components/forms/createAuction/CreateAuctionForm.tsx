import React from "react";
import { Formik, Form, Field } from "formik";

import Input from "../../shared/Input";
import Button from "../../shared/Button";
import {
  initialValues,
  validationSchema,
  type CreateAuctionFormData,
} from "./schema";

type CreateAuctionFormProps = {
  onSubmit: (formData: CreateAuctionFormData) => void;
  isSubmitting: boolean;
  onCancel: () => void;
};

const CreateAuctionForm: React.FC<CreateAuctionFormProps> = ({
  onSubmit,
  isSubmitting,
  onCancel,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form className="space-y-4">
          {/* Title */}
          <Field name="title">
            {({ field, form }: any) => (
              <Input
                label="Title"
                name="title"
                type="text"
                placeholder="e.g., iPhone 15 Pro Max"
                required
                field={field}
                form={form}
              />
            )}
          </Field>

          {/* Description */}
          <Field name="desc">
            {({ field, form }: any) => (
              <div>
                <label
                  htmlFor="desc"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  id="desc"
                  name="desc"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="Provide detailed information about the item..."
                  rows={4}
                  className={`w-full px-4 py-2 border ${
                    form.errors.desc && form.touched.desc
                      ? "border-red-300"
                      : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
                />
                {form.errors.desc && form.touched.desc && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.errors.desc}
                  </p>
                )}
              </div>
            )}
          </Field>

          {/* Starting Price */}
          <Field name="startingPrice">
            {({ field, form }: any) => (
              <div>
                <label
                  htmlFor="startingPrice"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Starting Price <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    id="startingPrice"
                    name="startingPrice"
                    type="number"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className={`w-full pl-8 pr-4 py-2 border ${
                      form.errors.startingPrice && form.touched.startingPrice
                        ? "border-red-300"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>
                {form.errors.startingPrice && form.touched.startingPrice && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.errors.startingPrice}
                  </p>
                )}
              </div>
            )}
          </Field>

          {/* Start Date & Time */}
          <Field name="startAt">
            {({ field, form }: any) => (
              <Input
                label="Start Date & Time"
                name="startAt"
                type="datetime-local"
                required
                field={field}
                form={form}
              />
            )}
          </Field>

          {/* End Date & Time */}
          <Field name="endsAt">
            {({ field, form }: any) => (
              <Input
                label="End Date & Time"
                name="endsAt"
                type="datetime-local"
                required
                field={field}
                form={form}
              />
            )}
          </Field>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              loading={isSubmitting}
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={isSubmitting}
              text="Create Auction"
            />
            <Button
              type="button"
              variant="secondary"
              text="Cancel"
              onClick={onCancel}
              className="flex-1"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateAuctionForm;
