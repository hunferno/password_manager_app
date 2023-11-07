import { StyleSheet } from "react-native";
import { COLORS } from "../../assets/COLORS";
import { windowHeight, windowWidth } from "../../assets/Dimensions";

export const identificationStyles = StyleSheet.create({
  emptyItemsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyItemsTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },

  emptyItemsText: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.blue,
    marginBottom: 10,
  },

  emptyItemsSubtext: {
    fontSize: 20,
    fontStyle: "italic",
    textAlign: "center",
    color: COLORS.blue,
  },

  identificationContainer: {
    paddingHorizontal: 10,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  imageContainer: {
    marginRight: 10,
    backgroundColor: COLORS.grey,
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth * 0.2,
    height: 50,
  },
  imageText: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.blue,
  },

  infoContainer: {
    width: windowWidth * 0.45,
    height: 50,
    justifyContent: "center",
  },
  infoText: {
    fontSize: 16,
    color: COLORS.blue,
  },
  infoSubtText: {
    fontSize: 15,
    color: COLORS.grey,
  },

  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: windowWidth * 0.2,
    height: 50,
  },
});
