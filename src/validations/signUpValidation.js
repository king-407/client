import * as Yup from "yup";
export const signUpValidation = Yup.object({
  email: Yup.string().email("Please enter valid email"),
  password: Yup.string().min(5, "Password must be at least 6 characters"),
});
