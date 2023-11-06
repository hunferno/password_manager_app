import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../screens/auth/RegisterScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import LaunchScreen from "../screens/auth/LaunchScreen";
import VerificationCodeScreen from "../screens/auth/VerificationCodeScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";

const Auth = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Auth.Navigator>
      <Auth.Screen
        name="Launch"
        component={LaunchScreen}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name="VerificationCode"
        component={VerificationCodeScreen}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          headerShown: false,
        }}
      />
    </Auth.Navigator>
  );
};

export default AuthNavigator;
