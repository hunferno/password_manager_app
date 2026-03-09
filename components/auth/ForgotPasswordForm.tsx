import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { Formik } from "formik";
import { authStyles } from "../../styles/auth/authStyles";
import { COLORS } from "../../assets/COLORS";
import ButtonForm from "./ButtonForm";
import { AuthContext } from "../../context/authContext";
import { forgotPasswordFormStruct } from "../../models/forgotPasswordFormStruct";
import { Entypo } from "@expo/vector-icons";
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

type ForgotPasswordFormProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList>;
  email: string | undefined;
  setForgetPswStep: React.Dispatch<React.SetStateAction<number>>;
  setForgotPasswordMsgSuccess: React.Dispatch<React.SetStateAction<string>>;
};

const ForgotPasswordForm = ({
  navigation,
  email,
  setForgetPswStep,
  setForgotPasswordMsgSuccess,
}: ForgotPasswordFormProps) => {
  const { onResetPassword } = useContext(AuthContext);

  const [forgotPasswordMsgErr, setForgotPasswordMsgErr] = useState("");
  const [showPasswordOne, setShowPasswordOne] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);

  return (
    <Formik
      initialValues={{ password: "", confirmPassword: "" }}
      validationSchema={forgotPasswordFormStruct}
      enableReinitialize
      onSubmit={async (values) => {
        const { password } = values;
        if (!email) return;

        const result = await onResetPassword!(email, password);

        if (isApiError(result)) {
          setForgotPasswordMsgErr(result.message);
          return;
        }

        const successResult = result as { message?: string };
        setForgotPasswordMsgSuccess(
          successResult?.message ?? "Mot de passe mis à jour."
        );
        setForgetPswStep(3);
      }}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <>
          {forgotPasswordMsgErr !== "" && (
            <View style={authStyles.errorMsgContainer}>
              <Text style={[authStyles.errorMsgText, { fontWeight: "bold" }]}>
                {forgotPasswordMsgErr}
              </Text>
            </View>
          )}

          <>
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.input}
                placeholder="Mot de passe Maitre"
                placeholderTextColor={COLORS.lightBlue}
                keyboardType="default"
                secureTextEntry={!showPasswordOne}
                value={values.password}
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
            {errors.password && (
              <View style={authStyles.errorMsgContainer}>
                <Text style={authStyles.errorMsgText}>{errors.password}</Text>
              </View>
            )}

            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.input}
                placeholder="Confirmer le mot de passe"
                placeholderTextColor={COLORS.lightBlue}
                keyboardType="default"
                secureTextEntry={!showPasswordTwo}
                value={values.confirmPassword}
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
            {errors.confirmPassword && (
              <View style={authStyles.errorMsgContainer}>
                <Text style={authStyles.errorMsgText}>
                  {errors.confirmPassword}
                </Text>
              </View>
            )}
          </>

          <View style={authStyles.buttonWrapper}>
            <ButtonForm
              title="ENVOYER"
              action={handleSubmit}
              color={COLORS.light}
              bgColor={COLORS.blue}
            />
          </View>
        </>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;
