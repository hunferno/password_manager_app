import * as Yup from "yup";

export const forgotPasswordEmailFormStruct = Yup.object().shape({
  email: Yup.string().email().required(),
});