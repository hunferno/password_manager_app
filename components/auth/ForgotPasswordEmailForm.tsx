import { View, Text, TextInput } from "react-native";
import React, { useContext, useState } from "react";
import { Formik } from "formik";
import { authStyles } from "../../styles/auth/authStyles";
import { COLORS } from "../../assets/COLORS";
import ButtonForm from "./ButtonForm";
import { AuthContext } from "../../context/authContext";
import { forgotPasswordEmailFormStruct } from "../../models/forgotPasswordEmailFormStruct";
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

type ForgotPasswordEmailFormProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList>;
};

const ForgotPasswordEmailForm = ({
  navigation,
}: ForgotPasswordEmailFormProps) => {
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

        if (isApiError(result)) {
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
