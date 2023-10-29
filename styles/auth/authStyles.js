import { StyleSheet } from "react-native";
import { COLORS } from "../../assets/COLORS";
import {
  statusBarHeight,
  windowHeight,
  windowWidth,
} from "../../assets/Dimensions";

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  logoWrapper: {
    marginTop: statusBarHeight,
    justifyContent: "center",
  },
  logo: {
    width: windowWidth,
    height: windowHeight * 0.2,
  },
  formWrapper: {
    flex: 1,
    justifyContent:"flex-end",
    alignItems: "center",
    backgroundColor: COLORS.light,
  },
  buttonWrapper: {},
});
