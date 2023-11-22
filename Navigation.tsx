import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./context/authContext";
import AppNavigator from "./navigators/AppNavigator";
import AuthNavigator from "./navigators/AuthNavigator";
import { AppProvider } from "./context/appContext";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { COLORS } from "./assets/COLORS";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import DrawerHeader from "./components/drawer/DrawerHeader";
import { windowWidth } from "./assets/Dimensions";
import Parametres from "./screens/app/Parametres";
import BiometricConnexion from "./screens/auth/BiometricConnexion";

const Drawer = createDrawerNavigator();

const Navigation = () => {
  const {
    authState,
    isBiometricSupported,
    isBiometricSet,
    isBioConnexionActive,
  } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {authState?.authenticated ? (
        <AppProvider>
          <Drawer.Navigator
            drawerContent={(props) => {
              return (
                <SafeAreaView>
                  <DrawerHeader />
                  <DrawerItemList {...props} />
                </SafeAreaView>
              );
            }}
            screenOptions={{
              drawerStyle: {
                backgroundColor: COLORS.grey,
                width: windowWidth * 0.6,
              },
              drawerLabelStyle: {
                color: COLORS.blue,
                fontSize: 16,
                fontWeight: "bold",
              },
              headerShown: false,
            }}
          >
            <Drawer.Screen
              name="Accueil"
              component={AppNavigator}
              options={{
                title: "Accueil",
                drawerIcon: () => (
                  <MaterialIcons name="home" size={20} color={COLORS.blue} />
                ),
              }}
            />
            <Drawer.Screen
              name="Parametres"
              component={Parametres}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: COLORS.blue,
                },
                headerTintColor: COLORS.light,
                title: "Paramètres",
                drawerIcon: () => (
                  <MaterialIcons
                    name="settings"
                    size={20}
                    color={COLORS.blue}
                  />
                ),
              }}
            />
          </Drawer.Navigator>
        </AppProvider>
      ) : isBiometricSupported &&
        isBiometricSet &&
        isBioConnexionActive &&
        authState?.token != null ? (
        <BiometricConnexion />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
