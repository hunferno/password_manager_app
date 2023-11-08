import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import IdentificationImage from "./IdentificationImage";
import * as Clipboard from "expo-clipboard";
import { identificationStyles } from "../../../styles/app/identificationStyles";
import { COLORS } from "../../../assets/COLORS";
import { IdentificationType } from "../../../types/identificationType";

const Actions = ({ data }: { data: IdentificationType }) => {
  const handleCopyPassword = async () => {
    await Clipboard.setStringAsync(data.password);
  };
  const handleCopyEmail = async () => {
    await Clipboard.setStringAsync(data.username);
  };

  return (
    <>
      <View style={identificationStyles.actionHeaderContainer}>
        <IdentificationImage name={data.name} />
      </View>
      <View style={identificationStyles.actionBodyContainer}>
        <TouchableOpacity
          style={identificationStyles.actionBodyTextContainer}
          onPress={handleCopyEmail}
        >
          <MaterialIcons name="content-copy" size={30} color={COLORS.blue} />
          <Text style={identificationStyles.actionBodyText}>
            Copier l'adresse e-mail
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={identificationStyles.actionBodyTextContainer}
          onPress={handleCopyPassword}
        >
          <MaterialIcons name="content-copy" size={30} color={COLORS.blue} />
          <Text style={identificationStyles.actionBodyText}>
            Copier le mot de passe
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={identificationStyles.actionBodyTextContainer}>
          <FontAwesome5 name="pen" size={24} color={COLORS.blue} />
          <Text style={identificationStyles.actionBodyText}>Modifier</Text>
        </TouchableOpacity>
        <TouchableOpacity style={identificationStyles.actionBodyTextContainer}>
          <FontAwesome5 name="trash" size={24} color={COLORS.failure} />
          <Text
            style={[
              identificationStyles.actionBodyText,
              { color: COLORS.failure },
            ]}
          >
            Supprimer
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Actions;
