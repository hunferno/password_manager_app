import { View, TextInput } from "react-native";
import { appStyles } from "../../styles/app/appStyles";
import { COLORS } from "../../assets/COLORS";
import { MaterialIcons } from "@expo/vector-icons";
import { useCallback, useContext, useMemo } from "react";
import debounce from "lodash/debounce";
import { AppContext } from "../../context/appContext";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppStackParamList } from "../../navigators/navigationTypes";
import type { IdentificationType } from "../../types/identificationType";

function isApiError(
  value: unknown
): value is { error: true; message: string } {
  return (
    value !== null &&
    typeof value === "object" &&
    "error" in value &&
    (value as { error: unknown }).error === true
  );
}

const SearchBox = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { onSearchItems, onGetAllIdentifications } = useContext(AppContext);

  const handleSearch = useCallback(
    async (text: string) => {
      let raw: unknown = [];

      if (text.length > 2) {
        raw = await onSearchItems!(text.trim().toLowerCase());
      } else if (text.length === 0) {
        raw = await onGetAllIdentifications!();
      }

      const datas: IdentificationType[] = isApiError(raw) ? [] : (raw as IdentificationType[]);
      navigation.navigate("ScreenStack", { screen: "Home", params: { datas } });
    },
    [navigation, onSearchItems, onGetAllIdentifications]
  );

  const debounceSearch = useMemo(() => debounce(handleSearch, 500), [handleSearch]);

  return (
    <View style={appStyles.searchContainer}>
      <MaterialIcons name="search" size={16} color={COLORS.blue} />
      <TextInput
        placeholder="Recherchez un élément..."
        placeholderTextColor={COLORS.lightBlue}
        style={appStyles.searchInput}
        onChangeText={debounceSearch}
      />
    </View>
  );
};

export default SearchBox;
