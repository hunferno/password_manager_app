import { createDrawerNavigator } from "@react-navigation/drawer";
import ParametersDrawer from "../screens/app/ParametersDrawer";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "../navigators/TabNavigator";

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Parameters" component={ParametersDrawer} />
    </Drawer.Navigator>
  );
};
