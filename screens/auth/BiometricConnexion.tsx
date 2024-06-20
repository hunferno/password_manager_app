import { View, Text, BackHandler } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { authStyles } from "../../styles/auth/authStyles";
import { Image } from "expo-image";
import { AuthContext } from "../../context/authContext";
import { useIsFocused } from "@react-navigation/native";

const BiometricConnexion = () => {
  const { biometricConnexion } = useContext(AuthContext);
  useEffect(() => {
    const bioConnexion = async () => {
      await biometricConnexion!().then((res) => {        
        if (res === false) {
          BackHandler.exitApp();
        }
      });
    };
    bioConnexion();
  }, []);

  return (
    <View style={authStyles.bioContainer}>
      <View style={authStyles.bioHeader}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={authStyles.bioLogo}
          contentFit="contain"
        />
        <Text style={authStyles.bioLogoTitle}>LockWords</Text>
      </View>
      <View style={authStyles.bioBodyContainer}>
        <Text style={authStyles.bioBodyText}>
          Déverrouillage par authentication biometrique
        </Text>
      </View>
    </View>
  );
};

export default BiometricConnexion;
