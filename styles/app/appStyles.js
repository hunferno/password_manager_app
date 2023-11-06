import { StyleSheet } from "react-native";
import { COLORS } from "../../assets/COLORS";
import {
  statusBarHeight,
  windowHeight,
  windowWidth,
} from "../../assets/Dimensions";

export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
});
