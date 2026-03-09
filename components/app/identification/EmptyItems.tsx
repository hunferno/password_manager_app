import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../assets/COLORS";
import { identificationStyles } from "../../../styles/app/identificationStyles";

export type EmptyItemsProps = {
  sectionName: string;
  sectionText: string;
};

const EmptyItems = ({ sectionName, sectionText }: EmptyItemsProps) => {
  return (
    <View style={identificationStyles.emptyItemsContainer}>
      <Ionicons name="folder-open-outline" size={45} color={COLORS.blue} />
      <View style={identificationStyles.emptyItemsTextContainer}>
        <Text style={identificationStyles.emptyItemsText}>
          Ajoutez vos {sectionName}
        </Text>
        <Text style={identificationStyles.emptyItemsSubtext}>
          Enregistrez {sectionText} dans cet espace sécurisé.
        </Text>
      </View>
    </View>
  );
};

export default EmptyItems;
