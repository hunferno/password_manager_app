import { View, Text } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { authStyles } from "../../styles/auth/authStyles";
import RegisterForm from "../../components/auth/RegisterForm";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../../navigators/AuthNavigator";

type RegisterScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "Register"
>;

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [registerStep, setRegisterStep] = useState(1);
  const authNavigation =
    navigation as unknown as NativeStackNavigationProp<AuthStackParamList>;

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
          {registerStep == 1 &&
            "Créons votre compte en commençant par votre adresse e-mail..."}
          {registerStep == 2 &&
            "... et un mot de passe maître. C'est votre allier le plus précieux."}
          {registerStep == 3 && "Bien reçu ! Pouvez-vous le saisir à nouveau ?"}
          {registerStep == 4 && "Pour rendre L'application plus personnelle..."}
        </Text>
      </View>
      <View style={authStyles.formWrapper}>
        <RegisterForm
          registerStep={registerStep}
          setRegisterStep={setRegisterStep}
          navigation={authNavigation}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;
