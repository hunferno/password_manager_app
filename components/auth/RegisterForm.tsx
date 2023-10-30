import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ErrorMessage, Formik } from "formik";
import { authStyles } from "../../styles/auth/authStyles";
import { Entypo } from "@expo/vector-icons";
import ButtonForm from "./ButtonForm";
import { COLORS } from "../../assets/COLORS";
import { registerFormStruct } from "../../models/registerFormStruct";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={registerFormStruct}
      enableReinitialize
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <>
          <View style={authStyles.inputContainer}>
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
          <ErrorMessage name="email">
            {(msg) => <Text style={authStyles.errorMsgText}>{msg}</Text>}
          </ErrorMessage>
          <View style={authStyles.inputContainer}>
            <TextInput
              style={authStyles.input}
              placeholder="Mot de passe Maitre"
              placeholderTextColor={COLORS.grey}
              keyboardType="default"
              secureTextEntry={!showPassword}
              value={values.password}
              onChangeText={handleChange("password")}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Entypo
                name={showPassword ? "eye" : "eye-with-line"}
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <ErrorMessage name="password">
            {(msg) => <Text style={authStyles.errorMsgText}>{msg}</Text>}
          </ErrorMessage>
          <View style={authStyles.buttonWrapper}>
            <ButtonForm
              title="CREER UN COMPTE"
              action={() => {
                "test";
              }}
              color={COLORS.blue}
              bgColor={COLORS.light}
            />
            <ButtonForm
              title="CONNEXION"
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

export default RegisterForm;
