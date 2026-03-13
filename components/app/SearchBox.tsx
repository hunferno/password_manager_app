import { View, TextInput } from "react-native";
import { appStyles } from "../../styles/app/appStyles";
import { COLORS } from "../../assets/COLORS";
import { MaterialIcons } from "@expo/vector-icons";
import { useCallback, useContext, useEffect, useMemo, useRef } from "react";
import debounce from "lodash/debounce";
import { AppContext } from "../../context/appContext";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppStackParamList } from "../../navigators/navigationTypes";
import type { IdentificationType } from "../../types/identificationType";
import type { SecureTextType } from "../../types/secureTextType";

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
  const { onSearchItems, onGetAllIdentifications, onSearchSecureText, onGetAllSecureText } =
    useContext(AppContext);

  const activeTab = useNavigationState((state) => {
    const screenStack = state?.routes?.find((r) => r.name === "ScreenStack");
    const tabState = (screenStack as { state?: { routes: { name: string }[]; index?: number } })?.state;
    if (!tabState?.routes?.length) return "Home";
    const idx = tabState.index ?? 0;
    return tabState.routes[idx]?.name ?? "Home";
  });

  const isFirstTabChange = useRef(true);

  useEffect(() => {
    if (isFirstTabChange.current) {
      isFirstTabChange.current = false;
      return;
    }
    navigation.navigate("ScreenStack", {
      screen: activeTab as "Home" | "SecureText",
      params: {},
    });
  }, [activeTab, navigation]);

  const handleSearch = useCallback(
    async (text: string) => {
      if (activeTab === "SecureText") {
        let raw: unknown = [];
        if (text.length > 2) {
          raw = await onSearchSecureText!(text.trim().toLowerCase());
        } else if (text.length === 0) {
          raw = await onGetAllSecureText!();
        }
        const datas: SecureTextType[] = isApiError(raw) ? [] : (raw as SecureTextType[]);
        navigation.navigate("ScreenStack", { screen: "SecureText", params: { datas } });
        return;
      }

      let raw: unknown = [];
      if (text.length > 2) {
        raw = await onSearchItems!(text.trim().toLowerCase());
      } else if (text.length === 0) {
        raw = await onGetAllIdentifications!();
      }
      const datas: IdentificationType[] = isApiError(raw) ? [] : (raw as IdentificationType[]);
      navigation.navigate("ScreenStack", { screen: "Home", params: { datas } });
    },
    [
      activeTab,
      navigation,
      onSearchItems,
      onGetAllIdentifications,
      onSearchSecureText,
      onGetAllSecureText,
    ]
  );

  const debounceSearch = useMemo(() => debounce(handleSearch, 500), [handleSearch]);

  return (
    <View style={appStyles.searchContainer}>
      <MaterialIcons name="search" size={16} color={COLORS.gold} />
      <TextInput
        key={activeTab}
        placeholder="Recherchez un élément..."
        placeholderTextColor={COLORS.lightBlue}
        style={appStyles.searchInput}
        onChangeText={debounceSearch}
      />
    </View>
  );
};

export default SearchBox;
