import { TouchableOpacity, View } from "react-native";
import { identificationStyles } from "../../../styles/app/identificationStyles";
import IdentificationInfo from "./IdentificationInfo";
import IdentificationActions from "./IdentificationActions";
import { FontAwesome5 } from "@expo/vector-icons";
import { IdentificationType } from "../../../types/identificationType";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppStackParamList } from "../../../navigators/navigationTypes";

export type IdentificationItemProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
  data: IdentificationType;
  handleActionModal: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<IdentificationType>>;
};

const IdentificationItem = ({
  navigation,
  data,
  handleActionModal,
  setSelectedItem,
}: IdentificationItemProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("AddIdentifications", { data, readOnly: true });
      }}
      style={identificationStyles.identificationContainer}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={identificationStyles.identificationImageContainer}>
          <FontAwesome5
            name="key"
            size={24}
            color={identificationStyles.identificationImage.color}
          />
        </View>
        <IdentificationInfo url={data.url} username={data.username} />
      </View>
      <IdentificationActions
        data={data}
        handleActionModal={handleActionModal}
        setSelectedItem={setSelectedItem}
      />
    </TouchableOpacity>
  );
};

export default IdentificationItem;
