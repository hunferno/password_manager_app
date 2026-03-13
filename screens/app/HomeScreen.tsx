import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { appStyles } from "../../styles/app/appStyles";
import EmptyItems from "../../components/app/identification/EmptyItems";
import IdentificationItem from "../../components/app/identification/IdentificationItem";

import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import Actions from "../../components/app/identification/Actions";
import { IdentificationType } from "../../types/identificationType";
import { AppContext } from "../../context/appContext";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type {
  TabParamList,
  AppStackParamList,
} from "../../navigators/navigationTypes";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
  route: RouteProp<TabParamList, "Home">;
};

const HomeScreen = ({ navigation, route }: HomeScreenProps) => {
  const { onGetAllIdentifications } = useContext(AppContext);
  const insets = useSafeAreaInsets();

  const isFocused = useIsFocused();

  const [reload, setReload] = useState(false);
  const [datas, setDatas] = useState<IdentificationType[]>([]);
  // Index du BottomSheet : -1 = fermé, >= 0 = ouvert
  const [sheetIndex, setSheetIndex] = useState(-1);
  const [selectedItem, setSelectedItem] = useState<IdentificationType>({
    _id: "",
    name: "",
    category: "",
    url: "",
    username: "",
    password: "",
    twoFACode: "",
  });

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["65%"], []);
  // callbacks
  const handleActionModalOpen = useCallback(() => {
    setSheetIndex(0);
  }, []);

  const handleActionModalClose = useCallback(() => {
    setSheetIndex(-1);
    bottomSheetRef.current?.close();
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
    [],
  );

  // Fermer le bottom sheet à chaque fois que l'écran reçoit le focus (ex. retour arrière)
  useFocusEffect(
    useCallback(() => {
      setSheetIndex(-1);
      bottomSheetRef.current?.close();
    }, []),
  );

  useEffect(() => {
    const routeDatas =
      (route.params as { datas?: IdentificationType[] } | undefined)?.datas;

    // Si la recherche a fourni des données, on les affiche en priorité
    if (routeDatas && Array.isArray(routeDatas)) {
      setDatas(routeDatas);
      return;
    }

    // Sinon, on récupère toutes les identifications (cas initial / reset)
    if (isFocused) {
      const fetchIdentifications = async () => {
        const result = await onGetAllIdentifications!();
        if (Array.isArray(result)) {
          setDatas(result);
        } else {
          setDatas([]);
        }
      };
      fetchIdentifications();
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
                <IdentificationItem
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
            ref={bottomSheetRef}
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
          sectionName="identifiants"
          sectionText="tous vos identifiants"
        />
      )}
      {sheetIndex < 0 && (
        <TouchableOpacity
          style={[appStyles.addBtnContainer, { bottom: 20 + insets.bottom }]}
          onPress={() =>
            navigation.navigate({
              name: "AddIdentifications",
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

export default HomeScreen;
