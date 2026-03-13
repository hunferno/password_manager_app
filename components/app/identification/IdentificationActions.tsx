import { View, TouchableOpacity } from "react-native";
import * as Clipboard from "expo-clipboard";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { identificationStyles } from "../../../styles/app/identificationStyles";
import { COLORS } from "../../../assets/COLORS";
import { IdentificationType } from "../../../types/identificationType";

export type IdentificationActionsProps = {
  data: IdentificationType;
  handleActionModal: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<IdentificationType>>;
};

const IdentificationActions = ({
  data,
  handleActionModal,
  setSelectedItem,
}: IdentificationActionsProps) => {
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
          setSelectedItem(data);
          handleActionModal();
        }}
      >
        <Entypo name="dots-three-vertical" size={30} color={COLORS.blue} />
      </TouchableOpacity>
    </View>
  );
};

export default IdentificationActions;
