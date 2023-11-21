import { View, Text } from "react-native";
import { drawerStyles } from "../../styles/drawer/drawerStyles";
import { Image } from "expo-image";
import { useContext } from "react";
import { AppContext } from "../../context/appContext";

const DrawerHeader = () => {
  const { userEmail } = useContext(AppContext);

  return (
    <View style={drawerStyles.headerContainer}>
      <View style={drawerStyles.headerLogoContainer}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={drawerStyles.headerLogo}
          contentFit="contain"
        />
      </View>
      <View style={drawerStyles.headerUserContainer}>
        <Text style={drawerStyles.headerUserText}>{userEmail}</Text>
      </View>
    </View>
  );
};

export default DrawerHeader;
