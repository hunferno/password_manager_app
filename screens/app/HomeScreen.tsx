import { View, Text, Button, TouchableOpacity, FlatList } from "react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { appStyles } from "../../styles/app/appStyles";
import { mockDatas } from "../../assets/mockDatas";
import EmptyItems from "../../components/app/identification/EmptyItems";
import IdentificationItem from "../../components/app/identification/IdentificationItem";

import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import Actions from "../../components/app/identification/Actions";
import { IdentificationType } from "../../types/identificationType";

const HomeScreen = ({ navigation }: { navigation: any }) => {
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
  const snapPoints = ["50%"];
  // callbacks
  const handleActionModal = () => {
    bottomSheetRef.current?.expand();
    setBottomSheetVisible(true);
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
    setDatas(mockDatas);
  }, []);

  return (
    <View style={appStyles.container}>
      {Array.isArray(datas) && datas.length > 0 ? (
        <>
          <FlatList
            data={datas}
            renderItem={({ item }) => (
              <>
                <IdentificationItem
                  data={item}
                  handleActionModal={handleActionModal}
                  setSelectedItem={setSelectedItem}
                />
              </>
            )}
            keyExtractor={(item) => item.id}
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
              <Actions data={selectedItem} navigation={navigation}/>
            </BottomSheetView>
          </BottomSheet>
        </>
      ) : (
        <EmptyItems />
      )}
      {!bottomSheetVisible && (
        <TouchableOpacity
          style={appStyles.addBtnContainer}
          onPress={() => navigation.navigate("Add")}
        >
          <MaterialIcons name="add" size={24} color="white" />
          <Text style={appStyles.addBtnText}>Ajouter</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HomeScreen;
