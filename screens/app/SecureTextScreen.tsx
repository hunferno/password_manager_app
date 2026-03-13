import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { appStyles } from "../../styles/app/appStyles";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import SecureTextItem from "../../components/app/secureText/SecureTextItem";
import EmptyItems from "../../components/app/identification/EmptyItems";
import { MaterialIcons } from "@expo/vector-icons";
import { SecureTextType } from "../../types/secureTextType";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import { AppContext } from "../../context/appContext";
import Actions from "../../components/app/secureText/Actions";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { TabParamList, AppStackParamList } from "../../navigators/navigationTypes";

type SecureTextScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
  route: RouteProp<TabParamList, "SecureText">;
};

const SecureTextScreen = ({ navigation, route }: SecureTextScreenProps) => {
  const { onGetAllSecureText } = useContext(AppContext);
  const insets = useSafeAreaInsets();

  const isFocused = useIsFocused();

  const [reload, setReload] = useState(false);
  const [datas, setDatas] = useState<SecureTextType[]>([]);
  const [sheetIndex, setSheetIndex] = useState(-1);
  const [selectedItem, setSelectedItem] = useState<SecureTextType>({
    _id: "",
    title: "",
    text: "",
  });

  // ref
  const bottomSheetSecureRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["30%"], []);
  // callbacks
  const handleActionModalOpen = useCallback(() => {
    setSheetIndex(0);
  }, []);

  const handleActionModalClose = useCallback(() => {
    setSheetIndex(-1);
    bottomSheetSecureRef.current?.close();
  }, []);

  const handleSheetChange = useCallback((index: number) => {
    setSheetIndex(index);
  }, []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        enableTouchThrough={true}
      />
    ),
    []
  );

  // Fermer le bottom sheet à chaque fois que l'écran reçoit le focus (ex. retour arrière)
  useFocusEffect(
    useCallback(() => {
      setSheetIndex(-1);
      bottomSheetSecureRef.current?.close();
    }, []),
  );

  useEffect(() => {
    const routeDatas =
      (route.params as { datas?: SecureTextType[] } | undefined)?.datas;

    if (routeDatas && Array.isArray(routeDatas)) {
      setDatas(routeDatas);
      return;
    }

    if (isFocused) {
      const fetchSecureTexts = async () => {
        const result = await onGetAllSecureText!();
        if (Array.isArray(result)) {
          setDatas(result);
        } else {
          setDatas([]);
        }
      };
      fetchSecureTexts();
    }
  }, [isFocused, reload, route.params]);

  return (
    <View style={appStyles.container}>
      {Array.isArray(datas) && datas.length > 0 ? (
        <>
          <FlatList
            data={datas}
            renderItem={({ item }) => (
              <>
                <SecureTextItem
                  navigation={navigation}
                  data={item}
                  handleActionModal={handleActionModalOpen}
                  setSelectedItem={setSelectedItem}
                />
              </>
            )}
            keyExtractor={(item) => item._id ?? ""}
            showsVerticalScrollIndicator={false}
            style={{ paddingTop: 10, marginBottom: 10 }}
          />

          {/* BOTTOM SHEET */}
          <BottomSheet
            ref={bottomSheetSecureRef}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            index={sheetIndex}
            enablePanDownToClose={true}
            onChange={handleSheetChange}
          >
            <BottomSheetView
              style={{
                paddingHorizontal: 30,
                paddingBottom: 20 + insets.bottom,
              }}
            >
              <Actions
                data={selectedItem}
                navigation={navigation}
                handleActionModalClose={handleActionModalClose}
                reload={reload}
                setReload={setReload}
              />
            </BottomSheetView>
          </BottomSheet>
        </>
      ) : (
        <EmptyItems
          sectionName="notes sécurisées"
          sectionText="toutes vos notes sécurisées"
        />
      )}

      {sheetIndex < 0 && (
        <TouchableOpacity
          style={[appStyles.addBtnContainer, { bottom: 20 + insets.bottom }]}
          onPress={() =>
              navigation.navigate({
                name: "AddSecureText",
                params: {},
              })
            }
        >
          <MaterialIcons name="add" size={24} color="white" />
          <Text style={appStyles.addBtnText}>Ajouter</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SecureTextScreen;
