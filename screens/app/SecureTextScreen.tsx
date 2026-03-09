import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { appStyles } from "../../styles/app/appStyles";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import SecureTextItem from "../../components/app/secureText/SecureTextItem";
import EmptyItems from "../../components/app/identification/EmptyItems";
import { MaterialIcons } from "@expo/vector-icons";
import { SecureTextType } from "../../types/secureTextType";
import { useIsFocused } from "@react-navigation/native";
import { AppContext } from "../../context/appContext";
import Actions from "../../components/app/secureText/Actions";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { TabParamList, AppStackParamList } from "../../navigators/navigationTypes";

type SecureTextScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
  route: RouteProp<TabParamList, "SecureText">;
};

const SecureTextScreen = ({ navigation }: SecureTextScreenProps) => {
  const { onGetAllSecureText } = useContext(AppContext);

  const isFocused = useIsFocused();

  const [reload, setReload] = useState(false);
  const [datas, setDatas] = useState<SecureTextType[]>([]);
  const [secureBottomSheetVisible, setSecureBottomSheetVisible] =
    useState(false);
  const [selectedItem, setSelectedItem] = useState<SecureTextType>({
    _id: "",
    title: "",
    text: "",
  });

  // ref
  const bottomSheetSecureRef = useRef<BottomSheet>(null);
  const snapPoints = ["30%"];
  // callbacks
  const handleActionModalOpen = () => {
    bottomSheetSecureRef.current?.expand();
    setSecureBottomSheetVisible(true);
  };

  const handleActionModalClose = () => {
    bottomSheetSecureRef.current?.close();
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
  }, [isFocused, reload]);

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
            index={-1}
            enablePanDownToClose={true}
            onClose={() => setSecureBottomSheetVisible(false)}
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
          sectionName="notes sécurisées"
          sectionText="toutes vos notes sécurisées"
        />
      )}

      {!secureBottomSheetVisible && (
        <TouchableOpacity
          style={appStyles.addBtnContainer}
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
