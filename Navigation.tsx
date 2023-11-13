import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./context/authContext";
import AppNavigator from "./navigators/AppNavigator";
import AuthNavigator from "./navigators/AuthNavigator";
import { AppProvider } from "./context/appContext";

const Navigation = () => {
  const { authState } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {authState?.authenticated ? (
        <AppProvider>
          <AppNavigator />
        </AppProvider>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
