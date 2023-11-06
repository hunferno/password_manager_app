import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";

const App = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <App.Navigator>
      <App.Screen name="ScreenStack" component={TabNavigator} />
    </App.Navigator>
  );
};

export default AppNavigator;
