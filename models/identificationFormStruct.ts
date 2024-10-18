import * as Yup from "yup";

export const identificationFormStruct = Yup.object().shape({
  id: Yup.string(),
  twoFactorCode: Yup.string(),
  name: Yup.string()
    .min(4, "Au minimum 4 caractères.")
    .required("Veuillez renseigner le nom du site web."),
  url: Yup.string()
    .matches(
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
      "Veuillez renseigner un url valide."
    )
    .required("Veuillez renseigner le site web."),
  username: Yup.string()
    .required("Veuillez renseigner le nom d'utilisateur."),
  password: Yup.string()
    .min(4, "Au minimum 4 caractères.")
    .required("Veuillez choisir un mot de passe."),
});
