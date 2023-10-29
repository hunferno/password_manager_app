import { View, Text } from "react-native";
import React from "react";
import { authStyles } from "../../styles/auth/authStyles";
import { StatusBar } from "expo-status-bar";
import { windowHeight } from "../../assets/Dimensions";
import { COLORS } from "../../assets/COLORS";
import { useForm } from "react-hook-form";
import { Image } from "expo-image";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormStruct } from "../../models/loginFormStruct";

const LoginScreen = ({ navigation }) => {

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
        
      </View>
      <View style={authStyles.buttonWrapper}></View>
    </View>
  );
};

export default LoginScreen;
