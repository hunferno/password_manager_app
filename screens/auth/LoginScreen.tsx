import { KeyboardAvoidingView, Text, View } from "react-native";
import { authStyles } from "../../styles/auth/authStyles";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import LoginForm from "../../components/auth/LoginForm";
import { useEffect, useRef, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../../navigators/AuthNavigator";

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, "Login">;

const LoginScreen = ({ navigation, route }: LoginScreenProps) => {
  const [loginStep, setLoginStep] = useState(1);
  const [resetFormKey, setResetFormKey] = useState(0);
  const hasHandledJustVerified = useRef(false);
  const authNavigation =
    navigation as unknown as NativeStackNavigationProp<AuthStackParamList>;

  useEffect(() => {
    if (route.params?.justVerified && !hasHandledJustVerified.current) {
      hasHandledJustVerified.current = true;
      setLoginStep(1);
      setResetFormKey((k) => k + 1);
    }
  }, [route.params?.justVerified]);

  return (
    <KeyboardAvoidingView style={authStyles.container}>
      <StatusBar style="light" />
      <View style={authStyles.logoWrapper}>
        <Image
          source={require("../../assets/images/logo.png")}
          contentFit="contain"
          style={authStyles.logo}
        />
      </View>
      <View style={{ paddingHorizontal: 25, marginTop: 10, marginBottom: 20 }}>
        <Text style={authStyles.registerStepDescriptionText}>
          {loginStep == 1 &&
            "Entrez votre e-mail afin de vérifier s'il est connu de notre base..."}
          {loginStep == 2 &&
            "...Email reconnu. Entrez votre mot de passe"}
        </Text>
      </View>
      <View style={authStyles.formWrapper}>
        <LoginForm
          key={resetFormKey}
          navigation={authNavigation}
          loginStep={loginStep}
          setLoginStep={setLoginStep}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
