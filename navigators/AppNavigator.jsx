import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import { appStyles } from "../styles/app/appStyles";
import { COLORS } from "../assets/COLORS";
import AddIdentifications from "../screens/app/AddIdentifications";
import AddSecureText from "../screens/app/AddSecureText";

const App = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <App.Navigator>
      <App.Screen name="ScreenStack" component={TabNavigator} />
      <App.Screen
        name="AddIdentifications"
        component={AddIdentifications}
        options={{
          headerStyle: appStyles.topBarBg,
          headerTintColor: COLORS.light,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <App.Screen
        name="AddSecureText"
        component={AddSecureText}
        options={{
          headerStyle: appStyles.topBarBg,
          headerTintColor: COLORS.light,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </App.Navigator>
  );
};

export default AppNavigator;
