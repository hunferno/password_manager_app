import { StyleSheet } from "react-native";
import { windowHeight, windowWidth } from "../../../assets/Dimensions";
import { COLORS } from "../../../assets/COLORS";

export const parameterStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBlue,
    padding: 20,
  },
  actionContainer: {
    maxWidth: windowWidth * 0.8,
    marginBottom: 35,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.light,
    marginBottom: 10,
  },
  actionDescription: { fontSize: 14, color: COLORS.light },
});
