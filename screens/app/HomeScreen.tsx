import { View, Text, Button } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { appStyles } from "../../styles/app/appStyles";

const HomeScreen = () => {
  const { onLogout } = useContext(AuthContext);

  return (
    <View style={appStyles.container}>
      <Text>Home</Text>
      <Button onPress={onLogout} title="Logout" />
    </View>
  );
};

export default HomeScreen;
