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
    backgroundColor: COLORS.light,
  },
  logoWrapper: {
    paddingTop: statusBarHeight,
    justifyContent: "center",
    backgroundColor: COLORS.dark,
  },
  logo: {
    width: windowWidth,
    height: windowHeight * 0.2,
  },
  formWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: windowWidth * 0.8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gold,
  },
  input: {
    fontSize: 16,
    width: "90%",
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 35,
    marginBottom: 10,
  },
  button: {
    width: windowWidth * 0.35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    paddingVertical: 15,
  },
  errorMsgText: {
    color: COLORS.failure,
    fontStyle: "italic",
  },
});
