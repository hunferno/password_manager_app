import { View, Text, TextInput } from "react-native";
import React, { useContext, useState } from "react";
import { Formik } from "formik";
import { authStyles } from "../../styles/auth/authStyles";
import { COLORS } from "../../assets/COLORS";
import ButtonForm from "./ButtonForm";
import { AuthContext } from "../../context/authContext";
import { forgotPasswordEmailFormStruct } from "../../models/forgotPasswordEmailFormStruct";

const ForgotPasswordEmailForm = ({ navigation }: { navigation: any }) => {
  const { onResendVerificationCode } = useContext(AuthContext);

  const [forgotPasswordMsgErr, setForgotPasswordMsgErr] = useState("");

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={forgotPasswordEmailFormStruct}
      enableReinitialize
      onSubmit={async (values) => {
        const { email } = values;

        const result = await onResendVerificationCode!(email);

        if (result && result.error) {
          setForgotPasswordMsgErr(result.message);
          return;
        }

        navigation.navigate("VerificationCode", {
          email,
          destination: "forgotPassword",
        });
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
            <View style={[authStyles.inputContainer, { marginBottom: 30 }]}>
              <TextInput
                autoCapitalize="none"
                style={authStyles.input}
                placeholder="Email"
                placeholderTextColor={COLORS.lightBlue}
                keyboardType="email-address"
                value={values.email}
                onChangeText={handleChange("email")}
              />
            </View>
            {errors.email && (
              <View style={authStyles.errorMsgContainer}>
                <Text style={authStyles.errorMsgText}>{errors.email}</Text>
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

export default ForgotPasswordEmailForm;
