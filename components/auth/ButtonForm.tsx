import { View, Text, TouchableOpacity } from "react-native";
import { authStyles } from "../../styles/auth/authStyles";

export default function ButtonForm({
  title,
  action,
  color,
  bgColor,
}: {
  title: string;
  action: () => void;
  color: string;
  bgColor: string;
}) {
  return (
    <>
      <TouchableOpacity
        onPress={action}
        style={[authStyles.button, { backgroundColor: bgColor }]}
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
