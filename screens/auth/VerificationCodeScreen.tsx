import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useContext, useEffect, useRef, useState } from "react";
import { authStyles } from "../../styles/auth/authStyles";
import { COLORS } from "../../assets/COLORS";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import ButtonForm from "../../components/auth/ButtonForm";
import { AuthContext } from "../../context/authContext";
import toaster from "../../components/toaster";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../../navigators/AuthNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/** Durée de validité du code (aligné avec le backend: auth.controller VERIFICATION_CODE_EXPIRY) */
const CODE_VALIDITY_MINUTES = 15;

type VerificationCodeScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "VerificationCode"
>;

function isApiError(
  value: unknown
): value is { error: true; message: string } {
  return (
    value !== null &&
    typeof value === "object" &&
    "error" in value &&
    (value as { error: unknown }).error === true
  );
}

const VerificationCodeScreen = ({
  route,
  navigation,
}: VerificationCodeScreenProps) => {
  const { email, destination } = route.params;
  const { onResendVerificationCode, onVerificationCode } =
    useContext(AuthContext);

    console.log("destination", destination);

  const [otpErrMessage, setOtpErrMessage] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const [otpValues, setOtpValues] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });
  const [enableBtn, setEnableBtn] = useState(true);

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
    if (
      otpValues[1] &&
      otpValues[2] &&
      otpValues[3] &&
      otpValues[4] &&
      otpValues[5] &&
      otpValues[6]
    ) {
      setEnableBtn(false);
    } else {
      setEnableBtn(true);
    }
  }, [otpValues]);

  const inputOne = useRef<TextInput>(null);
  const inputTwo = useRef<TextInput>(null);
  const inputThree = useRef<TextInput>(null);
  const inputFour = useRef<TextInput>(null);
  const inputFive = useRef<TextInput>(null);
  const inputSix = useRef<TextInput>(null);

  const sendVerification = async () => {
    const valuesTaped = Object.values(otpValues);
    const otpCode = valuesTaped.toString().replace(/,/g, "");

    setOtpErrMessage("");

    const verificationResponse = await onVerificationCode!(email, otpCode);

    if (isApiError(verificationResponse)) {
      setOtpErrMessage(verificationResponse.message);
      return;
    }

    // Code valide : navigation selon la destination
    if (destination === "login") {
      toaster("success", "Inscription", "Vous êtes maintenant inscrit");
      navigation.navigate("Login", { justVerified: true });
    } else if (destination === "forgotPassword") {
      navigation.replace("ForgotPassword", {
        from: "verificationCode",
        email,
      });
    }
  };

  const resendVerificationCode = async () => {
    const resendResponse = await onResendVerificationCode!(email);

    if (isApiError(resendResponse)) {
      setOtpErrMessage(resendResponse.message);
    }

    toaster("success", "Renvoie code", "Code renvoyé avec succès");
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

        <View style={{ paddingHorizontal: 25, marginVertical: 10 }}>
          {destination === "login" && (
            <Text style={authStyles.registerStepDescriptionText}>
              Voici la dernière étape...
            </Text>
          )}
          <Text style={authStyles.registerStepDescriptionText}>
            Entrez le code reçu par E-mail
          </Text>
          <Text
            style={[
              authStyles.registerStepDescriptionText,
              { fontSize: 14, fontWeight: "normal", marginTop: 8, opacity: 0.9 },
            ]}
          >
            Ce code est valable {CODE_VALIDITY_MINUTES} minutes
          </Text>
        </View>

        {otpErrMessage && (
          <Text style={[authStyles.errorMsgText, { fontWeight: "bold" }]}>
            {otpErrMessage}
          </Text>
        )}

        <View style={authStyles.verificationBodyContainer}>
        <View style={authStyles.verificationTextInputContainer}>
          <TextInput
            style={authStyles.verificationTextInput}
            maxLength={1}
            ref={inputOne}
            value={otpValues[1]}
            placeholder={"*"}
            placeholderTextColor={COLORS.lightBlue}
            keyboardType={"number-pad"}
            onChangeText={(text) => {
              text && inputTwo.current?.focus();
              setOtpValues({ ...otpValues, 1: text });
            }}
          />
          <TextInput
            style={authStyles.verificationTextInput}
            maxLength={1}
            ref={inputTwo}
            value={otpValues[2]}
            placeholder={"*"}
            placeholderTextColor={COLORS.lightBlue}
            keyboardType={"number-pad"}
            onChangeText={(text) => {
              !text ? inputOne.current?.focus() : inputThree.current?.focus();
              setOtpValues({ ...otpValues, 2: text });
            }}
          />
          <TextInput
            style={authStyles.verificationTextInput}
            maxLength={1}
            ref={inputThree}
            value={otpValues[3]}
            placeholder={"*"}
            placeholderTextColor={COLORS.lightBlue}
            keyboardType={"number-pad"}
            onChangeText={(text) => {
              !text ? inputTwo.current?.focus() : inputFour.current?.focus();
              setOtpValues({ ...otpValues, 3: text });
            }}
          />
          <TextInput
            style={authStyles.verificationTextInput}
            maxLength={1}
            ref={inputFour}
            value={otpValues[4]}
            placeholder={"*"}
            placeholderTextColor={COLORS.lightBlue}
            keyboardType={"number-pad"}
            onChangeText={(text) => {
              !text ? inputThree.current?.focus() : inputFive.current?.focus();
              setOtpValues({ ...otpValues, 4: text });
            }}
          />
          <TextInput
            style={authStyles.verificationTextInput}
            maxLength={1}
            ref={inputFive}
            value={otpValues[5]}
            placeholder={"*"}
            placeholderTextColor={COLORS.lightBlue}
            keyboardType={"number-pad"}
            onChangeText={(text) => {
              !text ? inputFour.current?.focus() : inputSix.current?.focus();
              setOtpValues({ ...otpValues, 5: text });
            }}
          />
          <TextInput
            style={authStyles.verificationTextInput}
            maxLength={1}
            ref={inputSix}
            value={otpValues[6]}
            placeholder={"*"}
            placeholderTextColor={COLORS.lightBlue}
            keyboardType={"number-pad"}
            onChangeText={(text) => {
              !text ? inputFive.current?.focus() : inputSix.current?.focus();
              setOtpValues({ ...otpValues, 6: text });
            }}
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <Text>Vous n'avez pas reçu de code ?</Text>
          <TouchableOpacity onPress={resendVerificationCode}>
            <Text
              style={[
                authStyles.registerStepDescriptionText,
                { fontStyle: "italic" },
              ]}
            >
              Renvoyer
            </Text>
          </TouchableOpacity>
        </View>
      </View>

        <View style={[authStyles.buttonWrapper, { marginBottom: 20 }]}>
          <ButtonForm
            title="ENVOYER"
            action={sendVerification}
            color={COLORS.light}
            bgColor={COLORS.blue}
            disableButton={enableBtn}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default VerificationCodeScreen;
