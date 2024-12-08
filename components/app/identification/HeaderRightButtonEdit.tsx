import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { COLORS } from "../../../assets/COLORS";
import { IdentificationType } from "../../../types/identificationType";
import { useNavigation } from "@react-navigation/native";

const HeaderRightButtonEdit = ({
  data,
  location,
}: {
  data: IdentificationType;
  location: string;
}) => {
  const navigation: any = useNavigation();

  const changeReadOnlyState = () => {
    navigation.navigate(location, { data, readOnly: false });
  };

  return (
    <TouchableOpacity onPress={() => changeReadOnlyState()}>
      <FontAwesome5 name="pen" size={20} color={COLORS.light} />
    </TouchableOpacity>
  );
};

export default HeaderRightButtonEdit;
