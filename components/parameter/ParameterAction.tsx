import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { parameterStyles } from "../../styles/app/parameters/parameterStyles";

const ParameterAction = ({
  index,
  title,
  description,
  action,
  extraComponent,
}: {
  index: number;
  title: string;
  description: string;
  action: Function;
  extraComponent?: Function;
}) => {
  return (
    <TouchableOpacity key={index} style={{ flexDirection: "row" }} onPress={() => action()}>
      <View style={parameterStyles.actionContainer}>
        <Text style={parameterStyles.actionTitle}>{title}</Text>
        <Text style={parameterStyles.actionDescription}>{description}</Text>
      </View>
      <View>{extraComponent && extraComponent()}</View>
    </TouchableOpacity>
  );
};

export default ParameterAction;
