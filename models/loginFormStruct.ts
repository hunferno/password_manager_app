import * as Yup from "yup";

export const loginFormStruct = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string()
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[*!$#-_@]).{8,}$/,
      "Au minimum 8 charactères | 1 lettre | 1 chiffre | 1 caractère spécial"
    )
    .required(),
});
