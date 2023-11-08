import { createDrawerNavigator } from "@react-navigation/drawer";
import ParametersDrawer from "../screens/app/ParametersDrawer";
import TabNavigator from "../navigators/TabNavigator";

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator>
      {/* <Drawer.Screen name="Accueil" component={TabNavigator} /> */}
      <Drawer.Screen name="Parameters" component={ParametersDrawer} />
    </Drawer.Navigator>
  );
};
