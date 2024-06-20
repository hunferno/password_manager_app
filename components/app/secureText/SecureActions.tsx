import { View, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { COLORS } from "../../../assets/COLORS";
import { SecureTextType } from "../../../types/secureTextType";
import { secureTextStyles } from "../../../styles/app/secureTextStyles";

const SecureActions = ({
  data,
  handleActionModal,
  setSelectedItem,
}: {
  data: SecureTextType;
  handleActionModal: any;
  setSelectedItem: any;
}) => {
  return (
    <View style={secureTextStyles.actionsContainer}>
      <TouchableOpacity
        onPress={() => {
          handleActionModal();
          setSelectedItem(data);
        }}
      >
        <Entypo name="dots-three-vertical" size={30} color={COLORS.blue} />
      </TouchableOpacity>
    </View>
  );
};

export default SecureActions;