import { View, Text, TouchableOpacity } from "react-native";
import { appStyles } from "../../styles/app/appStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../assets/COLORS";
import SearchBox from "./SearchBox";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import ModalLittleBox from "../modals/ModalLittleBox";

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

      <ModalLittleBox
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        action={onLogout}
      />
      <SearchBox />
    </View>
  );
};

export default HeaderTitle;
