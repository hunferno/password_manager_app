import * as Yup from "yup";

const emailSchema = Yup.string()
  .email("Inscrivez un email valide")
  .required("Champ obligatoire");

const passwordSchema = Yup.string()
  .matches(
    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[*!$#-_@]).{8,}$/,
    "Au minimum 8 caractères | 1 lettre | 1 chiffre | 1 caractère spécial"
  )
  .required("Champ obligatoire");

const confirmPasswordSchema = Yup.string()
  .oneOf([Yup.ref("password")], "Les mots de passe doivent être identiques")
  .required("Champ obligatoire");

const registerFormStructSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
});

/** Schéma pour l'étape 1 (email uniquement) */
export const registerStep1Schema = Yup.object().shape({
  email: emailSchema,
  password: Yup.string(),
  confirmPassword: Yup.string(),
});

/** Schéma pour l'étape 2 (email + mot de passe) */
export const registerStep2Schema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: Yup.string(),
});

/** Schéma pour l'étape 3 (email + mot de passe + confirmation) */
export const registerStep3Schema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
});

export type RegisterFormValues = Yup.InferType<typeof registerFormStructSchema>;
export const registerFormStruct = registerFormStructSchema;
