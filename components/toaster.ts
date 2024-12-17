import Toast from "react-native-toast-message";

const toaster = (
  type: string,
  text1: string,
  text2: string,
  visibilityTime: number = 3500
) => {
  Toast.show({
    type,
    position: "top",
    text1,
    text2,
    visibilityTime: visibilityTime,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
};

export default toaster;
