import { Text } from "react-native";
import { modalStyles } from "../../styles/app/modalStyles";
import { COLORS } from "../../assets/COLORS";

export const createTextFromLetter = (
  key: number,
  letter: string,
  size: number
) => {
  let color = "";
  if (/[0-9]/.test(letter) || letter === "*") {
    color = COLORS.blue;
  } else if (/[a-zA-Z]/.test(letter)) {
    color = COLORS.success;
  } else {
    color = COLORS.failure;
  }

  return (
    <Text
      key={key}
      style={[modalStyles.modalPasswordText, { color, fontSize: size }]}
    >
      {letter}
    </Text>
  );
};
