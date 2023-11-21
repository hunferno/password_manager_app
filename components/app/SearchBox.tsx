import { View, TextInput } from "react-native";
import { appStyles } from "../../styles/app/appStyles";
import { COLORS } from "../../assets/COLORS";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useMemo } from "react";
import debounce from "lodash/debounce";
import { AppContext } from "../../context/appContext";
import { useNavigation } from "@react-navigation/native";

const SearchBox = () => {
  const navigation: any = useNavigation();

  const { onSearchItems, onGetAllIdentifications } = useContext(AppContext);

  const handleSearch = async (text: string) => {
    let searchResult: any = [];

    if (text.length > 2) {
      searchResult = await onSearchItems!(text.trim().toLowerCase());
    } else if (text.length === 0) {
      searchResult = await onGetAllIdentifications!();
    }

    navigation.navigate("Home", { datas: searchResult });
  };

  const debounceSearch = useMemo(() => {
    return debounce(handleSearch, 500);
  }, [handleSearch]);

  return (
    <View style={appStyles.searchContainer}>
      <MaterialIcons name="search" size={16} color={COLORS.blue} />
      <TextInput
        placeholder="Recherchez un élément..."
        placeholderTextColor={COLORS.blue}
        style={appStyles.searchInput}
        onChangeText={debounceSearch}
      />
    </View>
  );
};

export default SearchBox;
