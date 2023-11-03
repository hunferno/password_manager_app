import { View, Text, TouchableOpacity } from "react-native";
import { authStyles } from "../../styles/auth/authStyles";
import { COLORS } from "../../assets/COLORS";

export default function ButtonForm({
  title,
  action,
  color,
  bgColor,
  disableButton,
}: {
  title: string;
  action: () => void;
  color: string;
  bgColor: string;
  disableButton?: boolean;
}) {
  return (
    <>
      <TouchableOpacity
        disabled={disableButton}
        onPress={action}
        style={[authStyles.button, { backgroundColor: disableButton? COLORS.grey : bgColor }]}
      >
        <Text
          style={{
            color: color,
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </>
  );
}
