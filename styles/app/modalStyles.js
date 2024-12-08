import { StyleSheet } from "react-native";
import { COLORS } from "../../assets/COLORS";
import { windowHeight, windowWidth } from "../../assets/Dimensions";

export const modalStyles = StyleSheet.create({
  // TEXT DESIGN
  modalText: {
    fontSize: 13,
    fontWeight: "bold",
    color: COLORS.blue,
    marginBottom: 20,
  },
  modalPasswordText: {
    fontWeight: "bold",
    color: COLORS.blue
  },
  modalBtnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.blue,
  },

  // CONTAINER DESIGN
  generatePasswordbackDrop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "rgba(107, 96, 88, 0.2)",
  },
  generatePasswordContainer: {
    position: "absolute",
    top: windowHeight * 0.15,
    left: windowWidth * 0.1,
    backgroundColor: COLORS.light,
    width: windowWidth * 0.8,
    height: windowHeight * 0.7,
    borderRadius: windowWidth * 0.05,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  generateHeaderContainer: {
    width: "100%",
    height: "40%",
    paddingVertical: windowHeight * 0.06,
  },
  generateHeaderInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 5,
  },
  generateBodyContainer: {
    width: "100%",
    height: "50%",
  },
  generateSliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  generateSwitchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  generateFooterContainer: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  // LOGOUT MODAL
  logoutModalContainer: {
    position: "absolute",
    top: windowHeight * 0.35,
    left: windowWidth * 0.2,
    width: windowWidth * 0.6,
    height: windowHeight * 0.3,
    borderRadius: windowWidth * 0.05,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: COLORS.blue,
  },

  // USER MODAL
  updateUserContainer: {
    backgroundColor: COLORS.grey,
    width: windowWidth,
    borderRadius: windowWidth * 0.05,
    padding: 10,
  },
  updateInputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: COLORS.light,
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  updateErrorText: {
    color: COLORS.failure,
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  updateInput: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.05,
    paddingHorizontal: 10,
  },
  updateModalBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 20,
  },
  updateModalBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth * 0.3,
    height: windowHeight * 0.05,
    borderRadius: 10,
  },
});
