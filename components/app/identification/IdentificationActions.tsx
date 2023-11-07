import { View, Text, TouchableOpacity, Alert } from "react-native";
import * as Clipboard from "expo-clipboard";
import { identificationStyles } from "../../../styles/app/identificationStyles";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../../assets/COLORS";

const IdentificationActions = ({ password }: { password: string }) => {
  const handleCopyPassword = async () => {
    await Clipboard.setStringAsync(password);
  };

  return (
    <View style={identificationStyles.actionsContainer}>
      <TouchableOpacity onPress={handleCopyPassword}>
        <MaterialIcons name="content-copy" size={30} color={COLORS.blue} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Entypo name="dots-three-vertical" size={30} color={COLORS.blue} />
      </TouchableOpacity>
    </View>
  );
};

export default IdentificationActions;
