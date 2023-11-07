import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../assets/COLORS";
import HomeScreen from "../screens/app/HomeScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useLayoutEffect } from "react";
import { appStyles } from "../styles/app/appStyles";
import { StatusBar } from "expo-status-bar";
import HeaderTitle from "../components/app/HeaderTitle";

const Tab = createMaterialTopTabNavigator();

function TabNavigator() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: appStyles.headerBg,
      headerTitle: () => <HeaderTitle title="Accueil" />,
    });
  }, [navigation]);

  return (
    <>
      <StatusBar style="light" />
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarStyle: appStyles.topBarBg,
            tabBarLabel: "IDENTIFIANTS",
            tabBarActiveTintColor: COLORS.light,
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default TabNavigator;
