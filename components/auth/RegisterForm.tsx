import { View, Text, TextInput, TouchableOpacity, Switch } from "react-native";
import React, { useContext, useState } from "react";
import { Formik, FormikErrors } from "formik";
import { authStyles } from "../../styles/auth/authStyles";
import { Entypo } from "@expo/vector-icons";
import ButtonForm from "./ButtonForm";
import { COLORS } from "../../assets/COLORS";
import { registerFormStruct } from "../../models/registerFormStruct";
import { AuthContext } from "../../context/authContext";
import toaster from "../toaster";

const RegisterForm = ({
  registerStep,
  setRegisterStep,
  navigation,
}: {
  registerStep: number;
  setRegisterStep: React.Dispatch<React.SetStateAction<number>>;
  navigation: any;
}) => {
  const { isEmailExistsInDB, onRegister, activeBioConnexion } =
    useContext(AuthContext);

  const [showPasswordOne, setShowPasswordOne] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);
  const [activeBio, setActiveBio] = useState(true);
  const [registerMsgErr, setRegisterMsgErr] = useState("");
  const [activeBioErrMsg, setActiveBioErrMsg] = useState("");
  const [registerInfo, setRegisterInfo] = useState<{
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
  }>({ email: null, password: null, confirmPassword: null });

  const handleChangeStep = async (
    errors: FormikErrors<{
      email: string;
      password: string;
      confirmPassword: string;
    }>
  ) => {
    if (registerStep == 1 && !errors.email) {
      const isValidEmail = await isEmailExistsInDB!(registerInfo.email!);
      if (isValidEmail.data.isExist) {
        setRegisterMsgErr("Email déja existant");
      } else {
        setRegisterMsgErr("");
        setRegisterStep(2);
      }
    } else if (registerStep == 2 && !errors.password) {
      setRegisterStep(3);
    } else if (registerStep == 3 && !errors.confirmPassword) {
      setRegisterStep(4);
    }
  };

  const handleDisableContinueButton = () => {
    if (registerStep == 1 && registerInfo.email == null) {
      return true;
    } else if (registerStep == 2 && registerInfo.password == null) {
      return true;
    } else if (registerStep == 3 && registerInfo.confirmPassword == null) {
      return true;
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "" }}
      validationSchema={registerFormStruct}
      enableReinitialize
      onSubmit={async (values) => {
        const { email, password } = values;

        const registration = await onRegister!(email, password);
        if (registration && registration.error) {
          setRegisterMsgErr(registration.message);
          return;
        }
        if (activeBio) {
          activeBioConnexion!();
        }

        toaster("success", "Inscription", "Inscription réussie");

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
                  placeholderTextColor={COLORS.grey}
                  keyboardType="email-address"
                  value={values.email}
                  onBlur={() => setFieldTouched("email")}
                  onChangeText={handleChange("email")}
                  onChange={(e) =>
                    setRegisterInfo({
                      ...registerInfo,
                      email: e.nativeEvent.text,
                    })
                  }
                />
              </View>
              {touched.email && errors.email && (
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
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  secureTextEntry={!showPasswordOne}
                  value={values.password}
                  onBlur={() => setFieldTouched("password")}
                  onChangeText={handleChange("password")}
                  onChange={(e) =>
                    setRegisterInfo({
                      ...registerInfo,
                      password: e.nativeEvent.text,
                    })
                  }
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
              {touched.password && errors.password && (
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
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  secureTextEntry={!showPasswordTwo}
                  value={values.confirmPassword}
                  onBlur={() => setFieldTouched("confirmPassword")}
                  onChangeText={handleChange("confirmPassword")}
                  onChange={(e) =>
                    setRegisterInfo({
                      ...registerInfo,
                      confirmPassword: e.nativeEvent.text,
                    })
                  }
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
              {touched.confirmPassword && errors.confirmPassword && (
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
              action={() =>
                registerStep === 4 ? handleSubmit() : handleChangeStep(errors)
              }
              color={COLORS.light}
              bgColor={COLORS.blue}
              disableButton={handleDisableContinueButton()}
            />
          </View>
        </>
      )}
    </Formik>
  );
};

export default RegisterForm;
