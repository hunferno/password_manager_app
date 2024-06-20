import * as Yup from "yup";

export const secureTextForm = Yup.object().shape({
  id: Yup.string(),
  title: Yup.string()
    .min(4, "Au minimum 4 caractères.")
    .required("Veuillez indiquer le titre de la note."),
  text: Yup.string(),
});
