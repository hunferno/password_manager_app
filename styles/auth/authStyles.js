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
    paddingBottom: 20,
  },
  logoWrapper: {
    paddingTop: statusBarHeight,
    justifyContent: "center",
    backgroundColor: COLORS.dark,
  },
  launchImg: {
    width: windowWidth,
    height: windowHeight * 0.4,
  },
  logo: {
    width: windowWidth,
    height: windowHeight * 0.15,
  },
  launchTextWrapper: {
    flex: 1,
    paddingHorizontal: 15,
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
  successMsgText: {
    color: COLORS.success,
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
  verificationBodyContainer: {
    flex: 1,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  verificationTextInputContainer: {
    marginVertical: 30,
    width: windowWidth * 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  verificationTextInput: {
    marginHorizontal: 5,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    borderRadius: 10,
    borderColor: COLORS.blue,
    borderWidth: 2,
  },
  bioContainer: {
    paddingTop: statusBarHeight,
    paddingHorizontal: 10,
  },
  bioHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  bioLogo: {
    width: windowWidth * 0.35,
    height: windowWidth * 0.35,
  },
  bioLogoTitle: {
    color: COLORS.blue,
    fontSize: 30,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  bioBodyContainer: {
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  bioBodyText: {
    color: COLORS.blue,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
});
