import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { authStyles } from "../../styles/auth/authStyles";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import LoginForm from "../../components/auth/LoginForm";
import { useEffect, useRef, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../../navigators/AuthNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, "Login">;

const LoginScreen = ({ navigation, route }: LoginScreenProps) => {
  const [loginStep, setLoginStep] = useState(1);
  const [resetFormKey, setResetFormKey] = useState(0);
  const hasHandledJustVerified = useRef(false);
  const authNavigation =
    navigation as unknown as NativeStackNavigationProp<AuthStackParamList>;
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
    if (route.params?.justVerified && !hasHandledJustVerified.current) {
      hasHandledJustVerified.current = true;
      setLoginStep(1);
      setResetFormKey((k) => k + 1);
    }
  }, [route.params?.justVerified]);

  useEffect(() => {
    if (route.params?.fromPasswordUpdate) {
      setLoginStep(1);
      setResetFormKey((k) => k + 1);
    }
  }, [route.params?.fromPasswordUpdate]);

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
            paddingBottom: keyboardVisible ? 12 : insets.bottom,
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
