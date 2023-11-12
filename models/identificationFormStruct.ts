import * as Yup from "yup";

export const identificationFormStruct = Yup.object().shape({
  id: Yup.string(),
  twoFactorCode: Yup.string(),
  name: Yup.string()
    .min(4, "Au minimum 4 caractères.")
    .required("Veuillez renseigner le nom du site web."),
  url: Yup.string()
    .url("ex: https://www.url.com")
    .required("Veuillez renseigner le site web."),
  username: Yup.string()
    .email("Veuillez renseigner un email valide.")
    .required("Veuillez renseigner le nom d'utilisateur."),
  password: Yup.string()
    .min(4, "Au minimum 4 caractères.")
    .required("Veuillez choisir un mot de passe."),
});
