import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { Formik } from "formik";
import { authStyles } from "../../styles/auth/authStyles";
import { COLORS } from "../../assets/COLORS";
import ButtonForm from "./ButtonForm";
import { AuthContext } from "../../context/authContext";
import { forgotPasswordFormStruct } from "../../models/forgotPasswordFormStruct";
import { Entypo } from "@expo/vector-icons";

const ForgotPasswordForm = ({
  navigation,
  email,
  setForgetPswStep,
  setForgotPasswordMsgSuccess,
}: {
  navigation: any;
  email: string;
  setForgetPswStep: any;
  setForgotPasswordMsgSuccess: any;
}) => {
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

        const result = await onResetPassword!(email, password);

        if (result && result.error) {
          setForgotPasswordMsgErr(result.message);
          return;
        }

        setForgotPasswordMsgSuccess(result.data.message);
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
                placeholderTextColor={COLORS.grey}
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
                placeholderTextColor={COLORS.grey}
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
