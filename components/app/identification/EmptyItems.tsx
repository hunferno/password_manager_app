import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../assets/COLORS";
import { identificationStyles } from "../../../styles/app/identificationStyles";

const EmptyItems = () => {
  return (
    <View style={identificationStyles.emptyItemsContainer}>
      <Ionicons name="folder-open-outline" size={45} color={COLORS.blue} />
      <View style={identificationStyles.emptyItemsTextContainer}>
        <Text style={identificationStyles.emptyItemsText}>
          Ajoutez vos identifiants
        </Text>
        <Text style={identificationStyles.emptyItemsSubtext}>
          Enregistrez tous vos identifiants dans cet espace sécurisé.
        </Text>
      </View>
    </View>
  );
};

export default EmptyItems;
