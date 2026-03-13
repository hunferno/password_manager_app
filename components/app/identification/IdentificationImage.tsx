import { View, Text } from "react-native";
import { identificationStyles } from "../../../styles/app/identificationStyles";

export type IdentificationImageProps = {
  name: string;
};

const IdentificationImage = ({ name }: IdentificationImageProps) => {
  return (
    <View style={identificationStyles.imageContainer}>
      <Text style={identificationStyles.imageText}>{name.substring(0, 3).toUpperCase()}</Text>
    </View>
  );
};

export default IdentificationImage;
