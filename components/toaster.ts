import Toast from "react-native-toast-message";

export type ToasterType = "success" | "error" | "info";

export type ToasterParams = {
  type: ToasterType;
  text1: string;
  text2: string;
  visibilityTime?: number;
};

const toaster = (
  type: ToasterType,
  text1: string,
  text2: string,
  visibilityTime: number = 3500
): void => {
  Toast.show({
    type,
    position: "top",
    text1,
    text2,
    visibilityTime,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
};

export default toaster;
