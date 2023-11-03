import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { COLORS } from "../assets/COLORS";
import HomeScreen from "../screens/app/HomeScreen";

const Tab = createBottomTabNavigator();

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
          tabBarLabel: "Accueil",
          tabBarActiveTintColor: COLORS.gold,
          tabBarInactiveTintColor: COLORS.grey,
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
