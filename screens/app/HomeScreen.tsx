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

const HomeScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const { onGetAllIdentifications } = useContext(AppContext);

  const isFocused = useIsFocused();

  const [reload, setReload] = useState(false); // [
  const [datas, setDatas] = useState<any>([]);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IdentificationType>({
    id: "",
    name: "",
    category: "",
    url: "",
    username: "",
    password: "",
  } as any);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["55%"];
  // callbacks
  const handleActionModalOpen = () => {
    bottomSheetRef.current?.expand();
    setBottomSheetVisible(true);
  };

  const handleActionModalClose = () => {
    bottomSheetRef.current?.close();
  };
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
        setDatas(result);
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
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            style={{ paddingTop: 10, marginBottom: 10 }}
          />

          {/* BOTTOM SHEET */}
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            index={-1}
            enablePanDownToClose={true}
            onClose={() => setBottomSheetVisible(false)}
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
      {!bottomSheetVisible && (
        <TouchableOpacity
          style={appStyles.addBtnContainer}
          onPress={() => navigation.navigate("AddIdentifications")}
        >
          <MaterialIcons name="add" size={24} color="white" />
          <Text style={appStyles.addBtnText}>Ajouter</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HomeScreen;
