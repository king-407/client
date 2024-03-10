import * as Yup from "yup";
export const postValidation = Yup.object({
  title: Yup.string().required("Please enter title"),
  category: Yup.string().required("Please enter category"),
  content: Yup.string().required("Please enter content"),

  image: Yup.string().required("Please enter image"),
});
