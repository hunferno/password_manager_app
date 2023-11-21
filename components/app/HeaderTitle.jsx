import { View, Text, TouchableOpacity } from "react-native";
import { appStyles } from "../../styles/app/appStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../assets/COLORS";
import SearchBox from "./SearchBox";
import { DrawerActions } from "@react-navigation/native";

const HeaderTitle = ({ title, navigation }) => {
  const handleOpenMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={{ flexDirection: "column" }}>
      <View style={appStyles.headerContainer}>
        <View style={appStyles.headerTitleContainer}>
          <TouchableOpacity
            style={appStyles.headerTitleIconMenuContainer}
            onPress={() => handleOpenMenu()}
          >
            <MaterialIcons name="menu" size={30} color={COLORS.light} />
          </TouchableOpacity>

          <Text style={appStyles.headerTitle}>{title}</Text>
        </View>
      </View>
      <SearchBox />
    </View>
  );
};

export default HeaderTitle;
