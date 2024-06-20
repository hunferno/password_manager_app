import { View, Text, TouchableOpacity, Modal } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { identificationStyles } from "../../../styles/app/identificationStyles";
import { COLORS } from "../../../assets/COLORS";
import { IdentificationType } from "../../../types/identificationType";
import { useContext, useState } from "react";
import ModalLittleBox from "../../modals/ModalLittleBox";
import { AppContext } from "../../../context/appContext";
import toaster from "../../toaster";
import { secureTextStyles } from "../../../styles/app/secureTextStyles";
import { SecureTextType } from "../../../types/secureTextType";

const Actions = ({
  data,
  navigation,
  handleActionModalClose,
  reload,
  setReload,
}: {
  data: SecureTextType;
  navigation: any;
  handleActionModalClose: any;
  reload: any;
  setReload: any;
}) => {
  const { onDeleteSecureText } = useContext(AppContext);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDelete = async () => {
    const result = await onDeleteSecureText!(data._id as string);

    if (result && result.error) {
      console.log(result);
    } else {
      toaster("success", "Suppression", "Note supprimée");
      setReload(!reload);
      handleActionModalClose();
      navigation.navigate("SecureText");
    }
  };

  return (
    <>
      <View style={secureTextStyles.actionHeaderContainer}>
        <View style={secureTextStyles.secureImageContainer}>
          <FontAwesome5
            name="file-alt"
            size={24}
            color={secureTextStyles.secureImage.color}
          />
        </View>
        <View>
          <Text numberOfLines={1} style={secureTextStyles.secureInfoTitle}>{data.title}</Text>
        </View>
      </View>
      <View style={identificationStyles.actionBodyContainer}>
        <TouchableOpacity
          style={identificationStyles.actionBodyTextContainer}
          onPress={() => {
            handleActionModalClose();
            navigation.navigate("AddSecureText", { data: data });
          }}
        >
          <FontAwesome5 name="pen" size={24} color={COLORS.blue} />
          <Text style={identificationStyles.actionBodyText}>Modifier</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={identificationStyles.actionBodyTextContainer}
          onPress={() => setDeleteModal(true)}
        >
          <FontAwesome5 name="trash" size={24} color={COLORS.failure} />
          <Text
            style={[
              identificationStyles.actionBodyText,
              { color: COLORS.failure },
            ]}
          >
            Supprimer
          </Text>
        </TouchableOpacity>
      </View>
      <ModalLittleBox
        modalVisible={deleteModal}
        setModalVisible={setDeleteModal}
        modalText={"Êtes-vous sûr de vouloir supprimer cette note ?"}
        action={handleDelete}
      />
    </>
  );
};

export default Actions;
