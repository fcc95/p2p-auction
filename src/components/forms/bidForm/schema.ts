import * as Yup from "yup";

export type BidFormData = {
  bid: number;
};

export const initialValues: BidFormData = {
  bid: 0,
};

export const createValidationSchema = (minimumBid: number) =>
  Yup.object({
    bid: Yup.number()
      .required("Required")
      .min(minimumBid + 0.01, `Bid must be greater than ${minimumBid}`),
  });
