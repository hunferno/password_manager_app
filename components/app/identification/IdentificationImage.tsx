import { Image } from "expo-image";
import { View, Text } from "react-native";
import { identificationStyles } from "../../../styles/app/identificationStyles";

const IdentificationImage = ({ name }: { name: string }) => {
  return (
    <View style={identificationStyles.imageContainer}>
      <Text style={identificationStyles.imageText}>{name.substring(0, 3).toUpperCase()}</Text>
    </View>
  );
};

export default IdentificationImage;
