import { COLORS } from "../assets/COLORS";
import HomeScreen from "../screens/app/HomeScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Tous les éléments",
          tabBarActiveTintColor: COLORS.blue,
          // tabBarIcon: ({ focused }) => (
          //   <Image
          //     source={require("../assets/img/house.png")}
          //     resizeMode="contain"
          //     style={[tabStyles.img, focused ? tabStyles.imgTransform : ""]}
          //   />
          // ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
