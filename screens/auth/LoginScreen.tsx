import { Text, View } from "react-native";
import { authStyles } from "../../styles/auth/authStyles";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import LoginForm from "../../components/auth/LoginForm";
import { useState } from "react";

const LoginScreen = ({ navigation }: any) => {
  const [loginStep, setLoginStep] = useState(1);

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
      <View style={{ paddingHorizontal: 25, marginVertical: 10 }}>
        <Text style={authStyles.registerStepDescriptionText}>
          {loginStep == 1 &&
            "Entrez votre e-mail afin de vérifier s'il est connu de notre base..."}
          {loginStep == 2 &&
            "...Votre email est bien connu. Maintenant entrez le mot de passe associé et vous serez connecté"}
        </Text>
      </View>
      <View style={authStyles.formWrapper}>
        <LoginForm
          navigation={navigation}
          loginStep={loginStep}
          setLoginStep={setLoginStep}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
