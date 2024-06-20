import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { SecureTextType } from "../../../types/secureTextType";
import { secureTextStyles } from "../../../styles/app/secureTextStyles";
import SecureActions from "./SecureActions";

const SecureTextItem = ({
  navigation,
  data,
  handleActionModal,
  setSelectedItem,
}: {
  navigation: any;
  data: SecureTextType;
  handleActionModal: any;
  setSelectedItem: any;
}) => {
  return (
    <TouchableOpacity
      //onPress={navigation.navigate("AddSecureText")}
      style={secureTextStyles.secureContainer}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={secureTextStyles.secureImageContainer}>
          <FontAwesome5
            name="file-alt"
            size={24}
            color={secureTextStyles.secureImage.color}
          />
        </View>
        <View>
          <Text numberOfLines={1} style={secureTextStyles.secureInfoTitle}>
            {data.title}
          </Text>
        </View>
      </View>
      <SecureActions
        data={data}
        handleActionModal={handleActionModal}
        setSelectedItem={setSelectedItem}
      />
    </TouchableOpacity>
  );
};

export default SecureTextItem;
