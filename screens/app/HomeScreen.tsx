import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
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
import { useIsFocused } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { TabParamList, AppStackParamList } from "../../navigators/navigationTypes";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
  route: RouteProp<TabParamList, "Home">;
};

const HomeScreen = ({ navigation, route }: HomeScreenProps) => {
  const { onGetAllIdentifications } = useContext(AppContext);

  const isFocused = useIsFocused();

  const [reload, setReload] = useState(false);
  const [datas, setDatas] = useState<IdentificationType[]>([]);
  // Index du BottomSheet : -1 = fermé, >= 0 = ouvert (source de vérité via onChange)
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
  const snapPoints = ["65%"];
  // callbacks
  const handleActionModalOpen = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleActionModalClose = useCallback(() => {
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
    []
  );

  useEffect(() => {
    if (route.params?.datas) {
      setDatas(route.params.datas);
    }
  }, [route.params?.datas]);

  useEffect(() => {
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
  }, [isFocused, reload]);

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
            index={0}
            enablePanDownToClose={true}
            onChange={handleSheetChange}
          >
            <BottomSheetView style={{ paddingHorizontal: 30 }}>
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
          style={appStyles.addBtnContainer}
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
