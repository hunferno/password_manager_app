import * as Yup from "yup";

export const registerFormStruct = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Au minimum 8 charactères | 1 lettre | 1 chiffre"
    )
    .required(),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Les mots de passe doivent être identiques"
  ),
});
