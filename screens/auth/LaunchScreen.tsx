import {
  View,
  Text,
  TouchableWithoutFeedback,
  BackHandler,
} from "react-native";
import { authStyles } from "../../styles/auth/authStyles";
import ButtonForm from "../../components/auth/ButtonForm";
import { COLORS } from "../../assets/COLORS";
import { Image } from "expo-image";
import { FontAwesome5 } from "@expo/vector-icons";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";

const LaunchScreen = ({ navigation }: { navigation: any }) => {
  const {
    biometricConnexion,
    isBiometricSupported,
    isBiometricSet,
    isBioConnexionActive,
    authState,
  } = useContext(AuthContext);

  const bioConnexion = async () => {
    await biometricConnexion!();
  };

  return (
    <View style={authStyles.launchContainer}>
      <View style={authStyles.launchTextWrapper}>
        <Image
          source={require("../../assets/images/launchImg.png")}
          contentFit="contain"
          style={authStyles.launchImg}
        />
        <Text
          style={[
            authStyles.registerHomeText,
            { fontSize: 40, textAlign: "center" },
          ]}
        >
          LOCK WORDS
        </Text>
        <Text
          style={[
            authStyles.registerHomeText,
            {
              fontSize: 20,
              marginTop: 10,
              color: COLORS.lightBlue,
              textAlign: "center",
            },
          ]}
        >
          L'application qui sécurise vos mots de passe. Dormez paisiblement...
        </Text>
      </View>

      {isBiometricSupported &&
        isBiometricSet &&
        isBioConnexionActive &&
        authState?.token != null && (
          <TouchableWithoutFeedback onPress={() => bioConnexion()}>
            <FontAwesome5 name="fingerprint" size={45} color={COLORS.gold} />
          </TouchableWithoutFeedback>
        )}

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
