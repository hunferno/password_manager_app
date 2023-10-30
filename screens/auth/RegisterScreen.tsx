import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { authStyles } from '../../styles/auth/authStyles';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterScreen = () => {
    return (
        <View style={authStyles.container}>
          <StatusBar style="light" />
          <View style={authStyles.logoWrapper}>
            <Image
              source={require("../../assets/images/logo.png")}
              contentFit="contain"
              style={authStyles.logo}
            />
          </View>
          <View style={authStyles.formWrapper}>
            <RegisterForm />
          </View>
        </View>
      );
}

export default RegisterScreen