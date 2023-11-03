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
  launchContainer: {
    flex: 1,
    backgroundColor: COLORS.light,
    justifyContent: "center",
    alignItems: "center",
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
  launchTextWrapper: {
    flex: 1,
    alignItems: "center",
  },
  registerHomeTextWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  registerHomeText: {
    color: COLORS.blue,
    fontWeight: "bold",
  },
  registerStepDescriptionText: {
    color: COLORS.blue,
    fontSize: 20,
    fontWeight: "bold",
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
    width: windowWidth,
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
  errorMsgContainer: {
    paddingHorizontal: 15,
  },
  errorMsgText: {
    color: COLORS.failure,
    fontStyle: "italic",
    textAlign: "center",
  },
  inputBioContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: windowWidth * 0.9,
    height: windowHeight * 0.3,
    borderRadius: 15,
    backgroundColor: COLORS.grey,
    marginBottom: windowHeight * 0.15,
    paddingHorizontal: 10,
  },
  inputBioLabel: {
    width: "75%",
    alignItems: "center",
  },
  checkbox: {
    width: "25%",
    alignItems: "center",
  },
});
