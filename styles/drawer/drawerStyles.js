import { StyleSheet } from "react-native";
import { COLORS } from "../../assets/COLORS";
import {
  statusBarHeight,
  windowHeight,
  windowWidth,
} from "../../assets/Dimensions";

export const drawerStyles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.blue,
    height: windowHeight * 0.27,
    width: windowWidth * 0.6,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: statusBarHeight,
    marginBottom: 20,
  },
  headerLogoContainer: {},
  headerLogo: {
    height: 100,
    width: 100,
  },
  headerUserContainer: {},
  headerUserText: {
    color: COLORS.light,
    fontSize: 16,
    fontWeight: "bold",
  },
});
