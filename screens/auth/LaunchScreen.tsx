import { View, Text } from "react-native";
import { authStyles } from "../../styles/auth/authStyles";
import ButtonForm from "../../components/auth/ButtonForm";
import { COLORS } from "../../assets/COLORS";
import { Image } from "expo-image";

const LaunchScreen = ({ navigation }: { navigation: any }) => {
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
          PASSWORD MANAGER
        </Text>
        <Text
          style={[
            authStyles.registerHomeText,
            {
              fontSize: 20,
              marginTop: 10,
              color: COLORS.gold,
              textAlign: "center",
            },
          ]}
        >
          L'application qui sécurise vos mots de passe. Dormez tranquille...
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
