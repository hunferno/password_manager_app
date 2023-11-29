import { View, Text } from "react-native";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { authStyles } from "../../styles/auth/authStyles";
import { useEffect, useState } from "react";
import ForgotPasswordEmailForm from "../../components/auth/ForgotPasswordEmailForm";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";
import ButtonForm from "../../components/auth/ButtonForm";
import { COLORS } from "../../assets/COLORS";

const ForgotPasswordScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {  
  const email = route.params?.email;

  const [forgetPswStep, setForgetPswStep] = useState(1);
  const [forgotPasswordMsgSuccess, setForgotPasswordMsgSuccess] = useState("");

  useEffect(() => {
    if (route.params?.from === "verificationCode") {
      setForgetPswStep(2);
    }
  }, [route.params?.from]);

  const handleConnexion = () => {
    navigation.navigate("Login");
  };

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
          {forgetPswStep == 1 &&
            "Mot de passe oublié? Vérifions si nous vous connaissons..."}
          {forgetPswStep == 2 &&
            "... et pour finir, choisissez un mot de passe!"}
          {forgetPswStep == 3 && forgotPasswordMsgSuccess}
        </Text>
      </View>

      <View style={authStyles.formWrapper}>
        {forgetPswStep === 1 && (
          <ForgotPasswordEmailForm navigation={navigation} />
        )}

        {forgetPswStep === 2 && (
          <ForgotPasswordForm
            navigation={navigation}
            email={email}
            setForgetPswStep={setForgetPswStep}
            setForgotPasswordMsgSuccess={setForgotPasswordMsgSuccess}
          />
        )}

        {forgetPswStep === 3 && (
          <View style={authStyles.buttonWrapper}>
            <ButtonForm
              title="CONNECTEZ-VOUS"
              action={handleConnexion}
              color={COLORS.light}
              bgColor={COLORS.blue}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
