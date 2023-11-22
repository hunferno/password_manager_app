import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { parameterStyles } from "../../styles/app/parameters/parameterStyles";

const ParameterAction = ({
  title,
  description,
  action,
  extraComponent,
}: {
  title: string;
  description: string;
  action: Function;
  extraComponent?: Function;
}) => {
  return (
    <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => action()}>
      <View style={parameterStyles.actionContainer}>
        <Text style={parameterStyles.actionTitle}>{title}</Text>
        <Text style={parameterStyles.actionDescription}>{description}</Text>
      </View>
      <View>{extraComponent && extraComponent()}</View>
    </TouchableOpacity>
  );
};

export default ParameterAction;
