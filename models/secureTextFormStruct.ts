import * as Yup from "yup";

const secureTextFormSchema = Yup.object().shape({
  id: Yup.string(),
  title: Yup.string()
    .min(4, "Au minimum 4 caractères.")
    .required("Veuillez indiquer le titre de la note."),
  text: Yup.string(),
});

export type SecureTextFormValues = Yup.InferType<typeof secureTextFormSchema>;
export const secureTextForm = secureTextFormSchema;
