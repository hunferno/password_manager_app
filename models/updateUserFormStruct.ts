import * as Yup from "yup";

const updateUserFormStructSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(4, "Au minimum 4 caractères")
    .required("Champ obligatoire"),
  newPassword: Yup.string()
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[*!$#-_@]).{8,}$/,
      "Au minimum 8 caractères | 1 lettre | 1 chiffre | 1 caractère spécial"
    )
    .required("Champ obligatoire"),
  confirmNewPassword: Yup.string()
    .oneOf(
      [Yup.ref("newPassword")],
      "Les mots de passe doivent être identiques"
    )
    .required("Champ obligatoire"),
});

export type UpdateUserFormValues = Yup.InferType<typeof updateUserFormStructSchema>;
export const updateUserFormStruct = updateUserFormStructSchema;
