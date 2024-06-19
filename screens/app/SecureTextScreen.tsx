import { useCallback, useContext, useRef, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { appStyles } from "../../styles/app/appStyles";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import SecureTextItem from "../../components/app/secureText/SecureTextItem";
import EmptyItems from "../../components/app/identification/EmptyItems";
import { MaterialIcons } from "@expo/vector-icons";
import { SecureTextType } from "../../types/secureTextType";
import { useIsFocused } from "@react-navigation/native";
import { AppContext } from "../../context/appContext";

const SecureTextScreen = ({ navigation }: { navigation: any }) => {
  const { onGetAllIdentifications } = useContext(AppContext);

  const isFocused = useIsFocused();

  const [datas, setDatas] = useState<any>([]);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SecureTextType>({
    id: "",
    title: "",
    text: "",
    createdAt: "",
    updatedAt: "",
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

  return (
    <View style={appStyles.container}>
      {Array.isArray(datas) && datas.length > 0 ? (
        <>
          <FlatList
            data={datas}
            renderItem={({ item }) => (
              <>
                <SecureTextItem
                  data={item}
                  //   handleActionModal={handleActionModalOpen}
                  //   setSelectedItem={setSelectedItem}
                />
              </>
            )}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            style={{ paddingTop: 10, marginBottom: 10 }}
          />

          {/* BOTTOM SHEET */}
          {/* <BottomSheet
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
          </BottomSheet> */}
        </>
      ) : (
        <EmptyItems
          sectionName="notes sécurisées"
          sectionText="toutes vos notes sécurisées"
        />
      )}

      <TouchableOpacity
        style={appStyles.addBtnContainer}
        onPress={() => navigation.navigate("AddSecureText")}
      >
        <MaterialIcons name="add" size={24} color="white" />
        <Text style={appStyles.addBtnText}>Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SecureTextScreen;
