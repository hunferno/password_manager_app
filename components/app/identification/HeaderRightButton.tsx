import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../../assets/COLORS";

const HeaderRightButton = ({ formRef }: { formRef: any }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        formRef.current &&
        (formRef.current as any)?.validateForm().then((errors: any) => {
          if (Object.keys(errors).length === 0) {
            formRef.current.submitForm();
          }
        })
      }
    >
      <MaterialIcons name="check" size={30} color={COLORS.light} />
    </TouchableOpacity>
  );
};

export default HeaderRightButton;
