import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { parameterStyles } from "../../styles/app/parameters/parameterStyles";

const ParameterAction = ({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action: Function;
}) => {
  return (
    <TouchableOpacity style={parameterStyles.actionContainer} onPress={() => action()}>
      <Text style={parameterStyles.actionTitle}>{title}</Text>
      <Text style={parameterStyles.actionDescription}>{description}</Text>
    </TouchableOpacity>
  );
};

export default ParameterAction;
