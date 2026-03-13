import * as Yup from "yup";

const emailSchema = Yup.string()
  .email("Veuillez renseigner un email valide !")
  .required("Veuillez renseigner votre email !");

const passwordSchema = Yup.string()
  .matches(
    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[*!$#-_@]).{8,}$/,
    "Au minimum 8 caractères | 1 lettre | 1 chiffre | 1 caractère spécial"
  )
  .required("Veuillez renseigner votre mot de passe !");

const loginFormStructSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

/** Schéma pour l'étape 1 (email uniquement) */
export const loginStep1Schema = Yup.object().shape({
  email: emailSchema,
  password: Yup.string(),
});

export type LoginFormValues = Yup.InferType<typeof loginFormStructSchema>;
export const loginFormStruct = loginFormStructSchema;
