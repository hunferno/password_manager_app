import { View } from "react-native";
import { authStyles } from "../../styles/auth/authStyles";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import LoginForm from "../../components/auth/LoginForm";

const LoginScreen = ({ navigation }: any) => {
  return (
    <View style={authStyles.container}>
      <StatusBar style="light" />
      <View style={authStyles.logoWrapper}>
        <Image
          source={require("../../assets/images/logo.png")}
          contentFit="contain"
          style={authStyles.logo}
        />
      </View>
      <View style={authStyles.formWrapper}>
        <LoginForm navigation={navigation} />
      </View>
    </View>
  );
};

export default LoginScreen;
