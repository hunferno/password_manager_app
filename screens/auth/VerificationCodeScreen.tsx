import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useContext, useEffect, useRef, useState } from "react";
import { authStyles } from "../../styles/auth/authStyles";
import { COLORS } from "../../assets/COLORS";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import ButtonForm from "../../components/auth/ButtonForm";
import { AuthContext } from "../../context/authContext";

const VerificationCodeScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const { email } = route.params;
  const { onResendVerificationCode, onVerificationCode } =
    useContext(AuthContext);

  const [otpErrMessage, setOtpErrMessage] = useState("");
  const [otpSuccessMessage, setOtpSuccessMessage] = useState("");
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

    // OtpVerification({ otpCode, phone });
    const verificationResponse = await onVerificationCode!(email, otpCode);

    if (verificationResponse && verificationResponse.error) {
      setOtpErrMessage(verificationResponse.message);
    }

    navigation.navigate("Login");
  };

  const resendVerificationCode = async () => {
    const resendResponse = await onResendVerificationCode!(email);

    if (resendResponse && resendResponse.error) {
      setOtpErrMessage(resendResponse.message);
    }

    setOtpSuccessMessage("Code renvoyé avec succès. Verifiez votre boite mail");
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
          Voici la dernière étape...
        </Text>
        <Text style={authStyles.registerStepDescriptionText}>
          Entrez le code reçu par E-mail
        </Text>
      </View>

      {otpErrMessage && (
        <Text style={[authStyles.errorMsgText, { fontWeight: "bold" }]}>
          {otpErrMessage}
        </Text>
      )}
      {otpSuccessMessage && (
        <Text style={[authStyles.successMsgText, { fontWeight: "bold" }]}>
          {otpSuccessMessage}
        </Text>
      )}

      <View style={authStyles.verificationBodyContainer}>
        <View style={authStyles.verificationTextInputContainer}>
          <TextInput
            style={authStyles.verificationTextInput}
            maxLength={1}
            ref={inputOne}
            placeholder={"*"}
            placeholderTextColor={COLORS.blue}
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
            placeholder={"*"}
            placeholderTextColor={COLORS.blue}
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
            placeholder={"*"}
            placeholderTextColor={COLORS.blue}
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
            placeholder={"*"}
            placeholderTextColor={COLORS.blue}
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
            placeholder={"*"}
            placeholderTextColor={COLORS.blue}
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
            placeholder={"*"}
            placeholderTextColor={COLORS.blue}
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
    </View>
  );
};

export default VerificationCodeScreen;
