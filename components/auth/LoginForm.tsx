import { Formik, type FormikErrors } from "formik";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { loginFormStruct } from "../../models/loginFormStruct";
import { COLORS } from "../../assets/COLORS";
import { authStyles } from "../../styles/auth/authStyles";
import { Entypo } from "@expo/vector-icons";
import { useContext, useState } from "react";
import ButtonForm from "./ButtonForm";
import { AuthContext } from "../../context/authContext";
import toaster from "../toaster";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../../navigators/AuthNavigator";

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

function isLoginNotVerifiedError(
  value: unknown
): value is { error: true; code: "ACCOUNT_NOT_VERIFIED"; message: string } {
  return (
    value !== null &&
    typeof value === "object" &&
    "code" in value &&
    (value as { code: string }).code === "ACCOUNT_NOT_VERIFIED"
  );
}

type LoginFormProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList>;
  loginStep: number;
  setLoginStep: React.Dispatch<React.SetStateAction<number>>;
};

const LoginForm = ({
  navigation,
  loginStep,
  setLoginStep,
}: LoginFormProps) => {
  const { onLogin, isEmailExistsInDB, onResendVerificationCode } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [loginMsgErr, setLoginMsgErr] = useState("");
  const [showPendingVerification, setShowPendingVerification] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleChangeStep = async (
    errors: FormikErrors<{
      email: string;
      password: string;
      confirmPassword: string;
    }>
  ) => {
    if (loginStep == 1 && !errors.email) {
      const result = await isEmailExistsInDB!(email);

      if (result.data.isExist) {
        setLoginMsgErr("");
        setShowPendingVerification(result.data.isVerified === false);
        setLoginStep(2);
      } else {
        setShowPendingVerification(false);
        setLoginMsgErr("Email non reconnu");
      }
    }
  };

  const handleResendCode = async () => {
    if (!email.trim()) return;
    setResendLoading(true);
    setLoginMsgErr("");
    const result = await onResendVerificationCode!(email.trim());
    setResendLoading(false);
    if (isApiError(result)) {
      setLoginMsgErr(result.message);
    } else {
      toaster("success", "Code renvoyé", "Vérifiez votre boîte mail");
    }
  };

  const goToVerificationScreen = () => {
    if (!email.trim()) return;
    navigation.navigate("VerificationCode", {
      email: email.trim(),
      destination: "login",
    });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginFormStruct}
      enableReinitialize
      onSubmit={async (values) => {
        setShowPendingVerification(false);
        const result = await onLogin!(values.email, values.password);

        if (isLoginNotVerifiedError(result)) {
          setShowPendingVerification(true);
          setLoginMsgErr(result.message);
          return;
        }
        if (isApiError(result)) {
          setLoginMsgErr(result.message);
        }
      }}
    >
      {({
        handleChange,
        handleSubmit,
        setFieldTouched,
        touched,
        values,
        errors,
      }) => (
        <>
          {loginMsgErr !== "" && (
            <View style={authStyles.errorMsgContainer}>
              <Text style={[authStyles.errorMsgText, { fontWeight: "bold" }]}>
                {loginMsgErr}
              </Text>
            </View>
          )}

          {showPendingVerification && email.trim() && (
            <View style={[authStyles.errorMsgContainer, { marginBottom: 12 }]}>
              <Text style={[authStyles.registerHomeText, { marginBottom: 8 }]}>
                Compte en attente de vérification
              </Text>
              <TouchableOpacity
                onPress={handleResendCode}
                disabled={resendLoading}
                style={{ marginBottom: 6 }}
              >
                <Text
                  style={[
                    authStyles.registerHomeText,
                    { fontStyle: "italic", textDecorationLine: "underline" },
                  ]}
                >
                  {resendLoading ? "Envoi en cours..." : "Renvoyer le code par email"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={goToVerificationScreen}>
                <Text
                  style={[
                    authStyles.registerHomeText,
                    { fontStyle: "italic", textDecorationLine: "underline" },
                  ]}
                >
                  J'ai reçu le code, vérifier mon compte
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {loginStep === 1 && (
            <>
              <View style={[authStyles.inputContainer, { marginBottom: 15 }]}>
                <TextInput
                  autoCapitalize="none"
                  style={authStyles.input}
                  placeholder="Email"
                  placeholderTextColor={COLORS.lightBlue}
                  keyboardType="email-address"
                  value={values.email}
                  onBlur={() => setFieldTouched("email")}
                  onChangeText={handleChange("email")}
                  onChange={(e) => {
                    setEmail(e.nativeEvent.text);
                    setLoginMsgErr("");
                    setShowPendingVerification(false);
                  }}
                />
              </View>
              {touched.email && errors.email && (
                <View style={authStyles.errorMsgContainer}>
                  <Text style={authStyles.errorMsgText}>{errors.email}</Text>
                </View>
              )}
            </>
          )}

          {loginStep === 2 && (
            <>
              <View style={[authStyles.inputContainer, { marginBottom: 15 }]}>
                <TextInput
                  style={authStyles.input}
                  placeholder="Mot de passe Maitre"
                  placeholderTextColor={COLORS.lightBlue}
                  keyboardType="default"
                  secureTextEntry={!showPassword}
                  value={values.password}
                  onBlur={() => setFieldTouched("password")}
                  onChangeText={handleChange("password")}
                  onChange={() => setLoginMsgErr("")}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Entypo
                    name={showPassword ? "eye" : "eye-with-line"}
                    size={30}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <View style={authStyles.errorMsgContainer}>
                  <Text style={authStyles.errorMsgText}>{errors.password}</Text>
                </View>
              )}

              {/* RESET PASSWORD */}
            </>
          )}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate({ name: "ForgotPassword", params: {} })
            }
          >
            <Text
              style={[
                authStyles.registerHomeText,
                { fontStyle: "italic", color: COLORS.blue, marginTop: 10 },
              ]}
            >
              Mot de passe oublié ?
            </Text>
          </TouchableOpacity>

          <View style={authStyles.buttonWrapper}>
            <ButtonForm
              title="CREER UN COMPTE"
              action={() => navigation.navigate("Register")}
              color={COLORS.blue}
              bgColor={COLORS.light}
            />
            <ButtonForm
              title={loginStep < 2 ? "CONTINUER" : "CONNEXION"}
              action={() =>
                loginStep < 2 ? handleChangeStep(errors) : handleSubmit()
              }
              color={COLORS.light}
              bgColor={COLORS.blue}
            />
          </View>
        </>
      )}
    </Formik>
  );
};

export default LoginForm;
