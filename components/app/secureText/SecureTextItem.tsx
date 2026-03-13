import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { SecureTextType } from "../../../types/secureTextType";
import { secureTextStyles } from "../../../styles/app/secureTextStyles";
import SecureActions from "./SecureActions";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppStackParamList } from "../../../navigators/navigationTypes";

export type SecureTextItemProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
  data: SecureTextType;
  handleActionModal: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<SecureTextType>>;
};

const SecureTextItem = ({
  navigation,
  data,
  handleActionModal,
  setSelectedItem,
}: SecureTextItemProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("AddSecureText", { data, readOnly: true });
      }}
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
