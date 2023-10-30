import * as Yup from "yup";

export const loginFormStruct = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Au minimum 8 charactères | 1 lettre | 1 chiffre"
    )
    .required(),
});
