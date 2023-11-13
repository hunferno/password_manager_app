import Toast from "react-native-toast-message";

const toaster = (type: string, text1: string, text2: string) => {
  Toast.show({
    type,
    position: "top",
    text1,
    text2,
    visibilityTime: 3500,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
};

export default toaster;
