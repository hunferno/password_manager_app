import { Formik, FormikErrors } from "formik";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { loginFormStruct } from "../../models/loginFormStruct";
import { COLORS } from "../../assets/COLORS";
import { authStyles } from "../../styles/auth/authStyles";
import { Entypo } from "@expo/vector-icons";
import { useContext, useState } from "react";
import ButtonForm from "./ButtonForm";
import { AuthContext } from "../../context/authContext";

const LoginForm = ({ navigation }: { navigation: any }) => {
  const { onLogin } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [loginStep, setLoginStep] = useState(1);

  const handleChangeStep = (
    errors: FormikErrors<{
      email: string;
      password: string;
      confirmPassword: string;
    }>
  ) => {
    if (loginStep == 1 && !errors.email) {
      setLoginStep(2);
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
          console.log(result.message);
        }
      }}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <>
          {loginStep === 1 && (
            <>
              <View style={[authStyles.inputContainer, { marginBottom: 30 }]}>
                <TextInput
                  autoCapitalize="none"
                  style={authStyles.input}
                  placeholder="Email"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="email-address"
                  value={values.email}
                  onChangeText={handleChange("email")}
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
              <View style={[authStyles.inputContainer, { marginBottom: 30 }]}>
                <TextInput
                  style={authStyles.input}
                  placeholder="Mot de passe Maitre"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  secureTextEntry={!showPassword}
                  value={values.password}
                  onChangeText={handleChange("password")}
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
            </>
          )}

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
                loginStep < 2 ? handleChangeStep(errors) : handleSubmit
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
