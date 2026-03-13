import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../../assets/COLORS";
import type { FormikProps } from "formik";

type IdentificationFormValues = {
  name: string;
  url: string;
  username: string;
  password: string;
  twoFACode: string;
};

export type HeaderRightButtonProps = {
  formRef: React.RefObject<FormikProps<IdentificationFormValues> | null>;
};

const HeaderRightButton = ({ formRef }: HeaderRightButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        const form = formRef.current;
        if (!form) return;
        form.validateForm().then((errors: Record<string, string>) => {
          if (Object.keys(errors).length === 0) {
            form.submitForm();
          }
        });
      }}
    >
      <MaterialIcons name="check" size={30} color={COLORS.light} />
    </TouchableOpacity>
  );
};

export default HeaderRightButton;
