import { View, Text, TextInput } from "react-native";
import { appStyles } from "../../styles/app/appStyles";
import { COLORS } from "../../assets/COLORS";
import { MaterialIcons } from "@expo/vector-icons";

const SearchBox = () => {
  return (
    <View style={appStyles.searchContainer}>
      <MaterialIcons name="search" size={16} color={COLORS.blue} />
      <TextInput
        placeholder="Recherchez un élément..."
        placeholderTextColor={COLORS.blue}
        style={appStyles.searchInput}
      />
    </View>
  );
};

export default SearchBox;
