import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import AddScreen from "../screens/app/AddScreen";
import { appStyles } from "../styles/app/appStyles";
import { COLORS } from "../assets/COLORS";
import HeaderRightButton from "../components/app/identification/HeaderRightButton";

const App = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <App.Navigator>
      <App.Screen name="ScreenStack" component={TabNavigator} />
      <App.Screen
        name="Add"
        component={AddScreen}
        options={{
          headerStyle: appStyles.topBarBg,
          headerTintColor: COLORS.light,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: "Ajouter un identifiant",
          // headerRight: () => <HeaderRightButton />,
        }}
      />
    </App.Navigator>
  );
};

export default AppNavigator;
