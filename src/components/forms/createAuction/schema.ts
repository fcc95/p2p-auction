import * as Yup from "yup";
import type { Auction } from "../../../store/auction/auctionTypes";

export type CreateAuctionFormData = Omit<
  Auction,
  "id" | "ownerId" | "ownerName"
>;

export const validationSchema = Yup.object({
  title: Yup.string().required("Title is required").trim(),
  desc: Yup.string().required("Description is required").trim(),
  startingPrice: Yup.number()
    .required("Starting price is required")
    .min(0.01, "Starting price must be greater than 0"),
  startAt: Yup.date().required("Start date is required"),
  endsAt: Yup.date().required("End date is required"),
});

export const initialValues: CreateAuctionFormData = {
  title: "",
  desc: "",
  startingPrice: 0,
  startAt: new Date(),
  endsAt: new Date(),
};
