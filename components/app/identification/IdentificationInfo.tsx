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
      <Text style={identificationStyles.infoText}>
        {url.includes("www") ? url.substring(4) : url}
      </Text>
      <Text numberOfLines={1} style={identificationStyles.infoSubtText}>
        {username}
      </Text>
    </View>
  );
};

export default IdentificationInfo;
