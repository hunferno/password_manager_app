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
    justifyContent: "center",
    alignItems: "center",
  },

  topBarBg: {
    backgroundColor: COLORS.blue,
  },

  headerBg: {
    backgroundColor: COLORS.blue,
    height: windowHeight * 0.1,
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: statusBarHeight,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: windowWidth * 0.9,
    height: windowHeight * 0.05,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 25,
  },

  searchInput: {
    padding: 10,
    color: COLORS.blue,
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 20,
    color: COLORS.light,
    fontWeight: "bold",
  },

  headerTitleIconMenuContainer: {
    marginRight: 20,
  },

  addBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 15,
    backgroundColor: COLORS.blue,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  addBtnText: {
    marginLeft: 10,
    color: COLORS.light,
    fontSize: 20,
  },
});
