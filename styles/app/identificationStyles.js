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
    paddingHorizontal: 20,
  },

  emptyItemsText: {
    fontSize: 24,
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

  actionHeaderContainer: {
    marginBottom: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.grey,
  },
  actionBodyContainer: {
    paddingHorizontal: 10,
    justifyContent: "flex-start",
  },
  actionBodyTextContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  actionBodyText: {
    marginLeft: 15,
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.blue,
  },

  addScreenHeaderConatiner: {
    backgroundColor: COLORS.gold,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  addScreenHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.blue,
  },
  formContainer: {
    height: windowHeight * 0.7,
    padding: 15,
    justifyContent: "space-evenly",
  },
  formInputContainer: {
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: COLORS.gold,
  },
  formInputText: {
    paddingHorizontal: 10,
    fontSize: 20,
    color: COLORS.blue,
  },
  formPasswordContainer: {
    backgroundColor: COLORS.blue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  formPasswordGenerateContainer: {
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  formPasswordGenerateText: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.blue,
  },
});
