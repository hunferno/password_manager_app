import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { COLORS } from "../../../assets/COLORS";
import { IdentificationType } from "../../../types/identificationType";
import { SecureTextType } from "../../../types/secureTextType";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppStackParamList } from "../../../navigators/navigationTypes";

export type HeaderRightButtonEditData =
  | IdentificationType
  | (SecureTextType & { createdAt?: string; updatedAt?: string });

const HeaderRightButtonEdit = ({
  data,
  location,
}: {
  data: HeaderRightButtonEditData;
  location: "AddIdentifications" | "AddSecureText";
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const changeReadOnlyState = () => {
    if (location === "AddIdentifications") {
      navigation.navigate("AddIdentifications", {
        data: data as IdentificationType,
        readOnly: false,
      });
    } else {
      navigation.navigate("AddSecureText", {
        data: data as SecureTextType & { createdAt?: string; updatedAt?: string },
        readOnly: false,
      });
    }
  };

  return (
    <TouchableOpacity onPress={() => changeReadOnlyState()}>
      <FontAwesome5 name="pen" size={20} color={COLORS.light} />
    </TouchableOpacity>
  );
};

export default HeaderRightButtonEdit;
