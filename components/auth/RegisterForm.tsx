import { View, Text, TextInput, TouchableOpacity, Switch } from "react-native";
import React, { useContext, useState } from "react";
import { Formik } from "formik";
import { authStyles } from "../../styles/auth/authStyles";
import { Entypo } from "@expo/vector-icons";
import ButtonForm from "./ButtonForm";
import { COLORS } from "../../assets/COLORS";
import {
  registerFormStruct,
  registerStep1Schema,
  registerStep2Schema,
  registerStep3Schema,
} from "../../models/registerFormStruct";
import { AuthContext } from "../../context/authContext";
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

type RegisterFormProps = {
  registerStep: number;
  setRegisterStep: React.Dispatch<React.SetStateAction<number>>;
  navigation: NativeStackNavigationProp<AuthStackParamList>;
};

const RegisterForm = ({
  registerStep,
  setRegisterStep,
  navigation,
}: RegisterFormProps) => {
  const { isEmailExistsInDB, onRegister, activeBioConnexion } =
    useContext(AuthContext);

  const [showPasswordOne, setShowPasswordOne] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);
  const [activeBio, setActiveBio] = useState(true);
  const [registerMsgErr, setRegisterMsgErr] = useState("");
  const [activeBioErrMsg, setActiveBioErrMsg] = useState("");
  const getValidationSchema = () => {
    switch (registerStep) {
      case 1:
        return registerStep1Schema;
      case 2:
        return registerStep2Schema;
      case 3:
        return registerStep3Schema;
      default:
        return registerFormStruct;
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "" }}
      validationSchema={getValidationSchema()}
      enableReinitialize
      onSubmit={async (values) => {
        const { email, password } = values;

        if (registerStep === 1) {
          const result = await isEmailExistsInDB!(email);
          if (result.data.isExist) {
            setRegisterMsgErr("Email déja existant");
            return;
          }
          setRegisterMsgErr("");
          setRegisterStep(2);
          return;
        }
        if (registerStep === 2) {
          setRegisterMsgErr("");
          setRegisterStep(3);
          return;
        }
        if (registerStep === 3) {
          setRegisterMsgErr("");
          setRegisterStep(4);
          return;
        }

        const registration = await onRegister!(email, password);
        if (isApiError(registration)) {
          setRegisterMsgErr(registration.message);
          return;
        }
        if (activeBio) {
          activeBioConnexion!();
        }

        navigation.navigate("VerificationCode", {
          email,
          destination: "login",
        });
      }}
    >
      {({
        handleChange,
        handleSubmit,
        setFieldTouched,
        touched,
        values,
        errors,
        submitCount,
      }) => (
        <>
          {/* ERROR MESSAGE */}
          {activeBioErrMsg !== "" && (
            <View style={authStyles.errorMsgContainer}>
              <Text style={[authStyles.errorMsgText, { fontWeight: "bold" }]}>
                {activeBioErrMsg}
              </Text>
            </View>
          )}
          {registerMsgErr !== "" && (
            <View style={authStyles.errorMsgContainer}>
              <Text style={[authStyles.errorMsgText, { fontWeight: "bold" }]}>
                {registerMsgErr}
              </Text>
            </View>
          )}

          {/* STEP 1 */}
          {registerStep == 1 && (
            <>
              <View style={authStyles.inputContainer}>
                <TextInput
                  autoCapitalize="none"
                  style={authStyles.input}
                  placeholder="Email"
                  placeholderTextColor={COLORS.lightBlue}
                  keyboardType="email-address"
                  value={values.email}
                  onBlur={() => setFieldTouched("email")}
                  onChangeText={handleChange("email")}
                  onChange={() => setRegisterMsgErr("")}
                />
              </View>
              {(touched.email || submitCount > 0) && errors.email && (
                <View style={authStyles.errorMsgContainer}>
                  <Text style={authStyles.errorMsgText}>{errors.email}</Text>
                </View>
              )}
            </>
          )}

          {/* STEP 2 */}
          {registerStep > 1 && registerStep < 4 && (
            <>
              <View style={authStyles.inputContainer}>
                <TextInput
                  style={authStyles.input}
                  placeholder="Mot de passe Maitre"
                  placeholderTextColor={COLORS.lightBlue}
                  keyboardType="default"
                  secureTextEntry={!showPasswordOne}
                  value={values.password}
                  onBlur={() => setFieldTouched("password")}
                  onChangeText={handleChange("password")}
                />
                <TouchableOpacity
                  onPress={() => setShowPasswordOne(!showPasswordOne)}
                >
                  <Entypo
                    name={showPasswordOne ? "eye" : "eye-with-line"}
                    size={30}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              {(touched.password || submitCount > 0) && errors.password && (
                <View style={authStyles.errorMsgContainer}>
                  <Text style={authStyles.errorMsgText}>{errors.password}</Text>
                </View>
              )}
            </>
          )}

          {/* STEP 3 */}
          {registerStep == 3 && (
            <>
              <View style={authStyles.inputContainer}>
                <TextInput
                  style={authStyles.input}
                  placeholder="Confirmer le mot de passe"
                  placeholderTextColor={COLORS.lightBlue}
                  keyboardType="default"
                  secureTextEntry={!showPasswordTwo}
                  value={values.confirmPassword}
                  onBlur={() => setFieldTouched("confirmPassword")}
                  onChangeText={handleChange("confirmPassword")}
                />
                <TouchableOpacity
                  onPress={() => setShowPasswordTwo(!showPasswordTwo)}
                >
                  <Entypo
                    name={showPasswordTwo ? "eye" : "eye-with-line"}
                    size={30}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              {(touched.confirmPassword || submitCount > 0) &&
                errors.confirmPassword && (
                  <View style={authStyles.errorMsgContainer}>
                    <Text style={authStyles.errorMsgText}>
                      {errors.confirmPassword}
                    </Text>
                  </View>
                )}
            </>
          )}

          {/* STEP 4 */}
          {registerStep == 4 && (
            <View style={authStyles.inputBioContainer}>
              <View style={authStyles.inputBioLabel}>
                <Text style={authStyles.registerStepDescriptionText}>
                  Déverrouillage Biométrique
                </Text>
                <Text style={{ marginTop: 10, fontStyle: "italic" }}>
                  Dévérrouillez l'application par emprunte biométrique
                </Text>
              </View>
              <Switch
                trackColor={{ false: COLORS.blue, true: COLORS.blue }}
                thumbColor={activeBio ? COLORS.success : COLORS.failure}
                onValueChange={() => setActiveBio(!activeBio)}
                value={activeBio}
              />
            </View>
          )}

          {/* BTN SESSION */}
          <View style={authStyles.buttonWrapper}>
            <ButtonForm
              title={registerStep > 1 ? "RETOUR" : "CONNEXION"}
              action={() => {
                registerStep > 1
                  ? setRegisterStep(registerStep - 1)
                  : navigation.navigate("Login");
              }}
              color={COLORS.blue}
              bgColor={COLORS.light}
            />

            <ButtonForm
              title={registerStep === 4 ? "CONNEXION" : "CONTINUER"}
              action={() => handleSubmit()}
              color={COLORS.light}
              bgColor={COLORS.blue}
            />
          </View>
        </>
      )}
    </Formik>
  );
};

export default RegisterForm;
