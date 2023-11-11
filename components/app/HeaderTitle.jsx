import { View, Text, TouchableOpacity, Modal } from "react-native";
import { appStyles } from "../../styles/app/appStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../assets/COLORS";
import SearchBox from "./SearchBox";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const HeaderTitle = ({ title }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { onLogout } = useContext(AuthContext);

  const onOpenMenu = () => {
    console.log("Open menu");
  };

  return (
    <View style={{ flexDirection: "column" }}>
      <View style={appStyles.headerContainer}>
        <View style={appStyles.headerTitleContainer}>
          <TouchableOpacity
            style={appStyles.headerTitleIconMenuContainer}
            onPress={() => onOpenMenu}
          >
            <MaterialIcons name="menu" size={30} color={COLORS.light} />
          </TouchableOpacity>

          <Text style={appStyles.headerTitle}>{title}</Text>
        </View>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <MaterialIcons
            name="power-settings-new"
            size={30}
            color={COLORS.failure}
          />
        </TouchableOpacity>
      </View>

      <SearchBox />
      <View style={{ flex: 1 }}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={appStyles.modalContent}>
            <Text style={appStyles.modalText}>
              Êtes-vous sûr de vouloir vous déconnecter ?
            </Text>

            <View style={appStyles.modalBtnContainer}>
              <TouchableOpacity
                style={appStyles.modalBtn}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  onLogout();
                }}
              >
                <Text style={appStyles.modalBtnText}>Oui</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={appStyles.modalBtn}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={appStyles.modalBtnText}>Non</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default HeaderTitle;
