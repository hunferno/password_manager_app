import { Text } from "react-native";
import { modalStyles } from "../../styles/app/modalStyles";
import { COLORS } from "../../assets/COLORS";

export const createTextFromLetter = (key: number, letter: any) => {
  let color = "";
  if (/[0-9]/.test(letter)) {
    color = COLORS.blue;
  } else if (/[a-zA-Z]/.test(letter)) {
    color = COLORS.success;
  } else {
    color = COLORS.failure;
  }

  return (
    <Text key={key} style={[modalStyles.modalPasswordText, { color }]}>
      {letter}
    </Text>
  );
};
