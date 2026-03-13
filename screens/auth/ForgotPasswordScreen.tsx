import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { authStyles } from "../../styles/auth/authStyles";
import { useEffect, useState } from "react";
import ForgotPasswordEmailForm from "../../components/auth/ForgotPasswordEmailForm";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";
import ButtonForm from "../../components/auth/ButtonForm";
import { COLORS } from "../../assets/COLORS";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../../navigators/AuthNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ForgotPasswordScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "ForgotPassword"
>;

const ForgotPasswordScreen = ({
  navigation,
  route,
}: ForgotPasswordScreenProps) => {
  const email = route.params?.email;

  const [forgetPswStep, setForgetPswStep] = useState(
    route.params?.from === "verificationCode" ? 2 : 1
  );
  const [forgotPasswordMsgSuccess, setForgotPasswordMsgSuccess] = useState("");
  const insets = useSafeAreaInsets();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  useEffect(() => {
    if (route.params?.from === "verificationCode") {
      setForgetPswStep(2);
    }
  }, [route.params?.from]);

  const handleConnexion = () => {
    navigation.navigate("Login", { fromPasswordUpdate: true });
  };

  return (
    <KeyboardAvoidingView
      style={authStyles.container}
      behavior="padding"
      keyboardVerticalOffset={-10}
    >
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={[
          authStyles.scrollContent,
          {
            paddingBottom: keyboardVisible ? 12 : 20 + insets.bottom,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;
