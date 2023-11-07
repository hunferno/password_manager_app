import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./context/authContext";
import AppNavigator from "./navigators/AppNavigator";
import AuthNavigator from "./navigators/AuthNavigator";

const Navigation = () => {
  const { authState } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {/* {authState?.authenticated ? <AppNavigator /> : <AuthNavigator />} */}
      <AppNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
