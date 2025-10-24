import * as Yup from "yup";
import type { UserProfile } from "../../../store/user/userTypes";

export type FormValues = Omit<UserProfile, "id">;

export const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .trim(),
  surname: Yup.string()
    .required("Surname is required")
    .min(2, "Surname must be at least 2 characters")
    .trim(),
});

export const initialValues: FormValues = {
  name: "",
  surname: "",
};
