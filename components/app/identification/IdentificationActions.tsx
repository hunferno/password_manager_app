import { View, TouchableOpacity } from "react-native";
import * as Clipboard from "expo-clipboard";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { identificationStyles } from "../../../styles/app/identificationStyles";
import { COLORS } from "../../../assets/COLORS";
import { IdentificationType } from "../../../types/identificationType";

const IdentificationActions = ({
  data,
  handleActionModal,
  setSelectedItem,
}: {
  data: IdentificationType;
  handleActionModal: any;
  setSelectedItem: any;
}) => {
  const handleCopyPassword = async () => {
    await Clipboard.setStringAsync(data.password);
  };

  return (
    <View style={identificationStyles.actionsContainer}>
      <TouchableOpacity onPress={handleCopyPassword}>
        <MaterialIcons name="content-copy" size={30} color={COLORS.blue} />
      </TouchableOpacity>
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

export default IdentificationActions;
