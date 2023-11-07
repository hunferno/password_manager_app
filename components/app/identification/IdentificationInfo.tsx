import { View, Text } from "react-native";
import { identificationStyles } from "../../../styles/app/identificationStyles";

const IdentificationInfo = ({
  url,
  username,
}: {
  url: string;
  username: string;
}) => {
  return (
    <View style={identificationStyles.infoContainer}>
      <Text style={identificationStyles.infoText}>{url.substring(4)}</Text>
      <Text style={identificationStyles.infoSubtText}>{username}</Text>
    </View>
  );
};

export default IdentificationInfo;
