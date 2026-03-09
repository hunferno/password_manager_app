import * as Yup from "yup";

const loginFormStructSchema = Yup.object().shape({
  email: Yup.string().email().required("Veuillez renseigner votre email !"),
  password: Yup.string()
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[*!$#-_@]).{8,}$/,
      "Au minimum 8 caractères | 1 lettre | 1 chiffre | 1 caractère spécial"
    )
    .required(),
});

export type LoginFormValues = Yup.InferType<typeof loginFormStructSchema>;
export const loginFormStruct = loginFormStructSchema;
