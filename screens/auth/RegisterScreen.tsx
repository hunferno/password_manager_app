import { View, Text } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { authStyles } from "../../styles/auth/authStyles";
import RegisterForm from "../../components/auth/RegisterForm";

const RegisterScreen = ({ navigation }: any) => {
  const [registerStep, setRegisterStep] = useState(1);

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
          {registerStep == 1 && "Commençons par votre adresse e-mail..."}
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
          navigation={navigation}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;
