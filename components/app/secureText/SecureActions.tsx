import { View, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { COLORS } from "../../../assets/COLORS";
import { SecureTextType } from "../../../types/secureTextType";
import { secureTextStyles } from "../../../styles/app/secureTextStyles";

export type SecureActionsProps = {
  data: SecureTextType;
  handleActionModal: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<SecureTextType>>;
};

const SecureActions = ({
  data,
  handleActionModal,
  setSelectedItem,
}: SecureActionsProps) => {
  return (
    <View style={secureTextStyles.actionsContainer}>
      <TouchableOpacity
        onPress={() => {
          setSelectedItem(data);
          handleActionModal();
        }}
      >
        <Entypo name="dots-three-vertical" size={30} color={COLORS.blue} />
      </TouchableOpacity>
    </View>
  );
};

export default SecureActions;