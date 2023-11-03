import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import { Button } from "react-native";
import { AuthContext } from "../context/authContext";

const App = createNativeStackNavigator();

const AppNavigator = () => {
  const { onLogout } = useContext(AuthContext);
  return (
    <App.Navigator >
      <App.Screen
        name="ScreenStack"
        component={TabNavigator}
        options={{
          headerRight: () => <Button onPress={onLogout} title="Logout" />,
        }}
      />
    </App.Navigator>
  );
};

export default AppNavigator;
