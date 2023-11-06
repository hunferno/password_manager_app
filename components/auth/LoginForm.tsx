import { Formik, FormikErrors } from "formik";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { loginFormStruct } from "../../models/loginFormStruct";
import { COLORS } from "../../assets/COLORS";
import { authStyles } from "../../styles/auth/authStyles";
import { Entypo } from "@expo/vector-icons";
import { useContext, useState } from "react";
import ButtonForm from "./ButtonForm";
import { AuthContext } from "../../context/authContext";

const LoginForm = ({
  navigation,
  loginStep,
  setLoginStep,
}: {
  navigation: any;
  loginStep: number;
  setLoginStep: any;
}) => {
  const { onLogin, isEmailExistsInDB } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [loginMsgErr, setLoginMsgErr] = useState("");

  const handleChangeStep = async (
    errors: FormikErrors<{
      email: string;
      password: string;
      confirmPassword: string;
    }>
  ) => {
    if (loginStep == 1 && !errors.email) {
      const isValidEmail = await isEmailExistsInDB!(email);

      if (isValidEmail.data.isExist) {
        setLoginMsgErr("");
        setLoginStep(2);
      } else {
        setLoginMsgErr("Email non reconnu");
      }
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginFormStruct}
      enableReinitialize
      onSubmit={async (values) => {
        const result = await onLogin!(values.email, values.password);

        if (result && result.error) {
          setLoginMsgErr(result.message);
        }
      }}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <>
          {loginMsgErr !== "" && (
            <View style={authStyles.errorMsgContainer}>
              <Text style={[authStyles.errorMsgText, { fontWeight: "bold" }]}>
                {loginMsgErr}
              </Text>
            </View>
          )}

          {loginStep === 1 && (
            <>
              <View style={[authStyles.inputContainer, { marginBottom: 15 }]}>
                <TextInput
                  autoCapitalize="none"
                  style={authStyles.input}
                  placeholder="Email"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="email-address"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onChange={(e) => {
                    setEmail(e.nativeEvent.text);
                    setLoginMsgErr("");
                  }}
                />
              </View>
              {errors.email && (
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
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  secureTextEntry={!showPassword}
                  value={values.password}
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
              {errors.password && (
                <View style={authStyles.errorMsgContainer}>
                  <Text style={authStyles.errorMsgText}>{errors.password}</Text>
                </View>
              )}

              {/* RESET PASSWORD */}
            </>
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text
              style={[
                authStyles.registerHomeText,
                { fontStyle: "italic", color: COLORS.grey, marginTop: 10 },
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
