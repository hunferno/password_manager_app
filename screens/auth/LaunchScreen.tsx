import { View, Text } from "react-native";
import React from "react";
import { authStyles } from "../../styles/auth/authStyles";
import ButtonForm from "../../components/auth/ButtonForm";
import { COLORS } from "../../assets/COLORS";

const LaunchScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={authStyles.launchContainer}>
      <View style={authStyles.launchTextWrapper}>
        <Text style={[authStyles.registerHomeText, { fontSize: 40 }]}>
          L'application qui sécurise vos mots de passe
        </Text>
        <Text
          style={[
            authStyles.registerHomeText,
            { fontSize: 20, marginTop: 10, color: COLORS.grey },
          ]}
        >
          Découvrez la magie par vous même
        </Text>
      </View>

      <View style={authStyles.buttonWrapper}>
        <ButtonForm
          title="CONNEXION"
          action={() => navigation.navigate("Login")}
          color={COLORS.blue}
          bgColor={COLORS.light}
        />
        <ButtonForm
          title="CREER UN COMPTE"
          action={() => navigation.navigate("Register")}
          color={COLORS.light}
          bgColor={COLORS.blue}
        />
      </View>
    </View>
  );
};

export default LaunchScreen;
