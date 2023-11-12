import { StyleSheet } from "react-native";
import { COLORS } from "../../assets/COLORS";
import { windowHeight, windowWidth } from "../../assets/Dimensions";

export const modalStyles = StyleSheet.create({
  // TEXT DESIGN
  modalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.blue,
    marginBottom: 20,
  },
  modalPasswordText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.blue,
    marginBottom: 20,
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
    backgroundColor: COLORS.light,
    width: windowWidth * 0.6,
    height: windowHeight * 0.3,
    borderRadius: windowWidth * 0.05,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: COLORS.blue,
  },
});
