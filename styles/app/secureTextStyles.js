import { StyleSheet } from "react-native";
import { COLORS } from "../../assets/COLORS";
import { windowHeight, windowWidth } from "../../assets/Dimensions";

export const secureTextStyles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  titleText: {
    width: windowWidth * 0.9,
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.blue,
  },

  noteContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  noteText: {
    width: windowWidth * 0.9,
    fontSize: 16,
    color: COLORS.blue,
  },
});
