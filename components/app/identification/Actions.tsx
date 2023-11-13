import { View, Text, TouchableOpacity, Modal } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import IdentificationImage from "./IdentificationImage";
import * as Clipboard from "expo-clipboard";
import { identificationStyles } from "../../../styles/app/identificationStyles";
import { COLORS } from "../../../assets/COLORS";
import { IdentificationType } from "../../../types/identificationType";
import { useContext, useState } from "react";
import ModalLittleBox from "../../modals/ModalLittleBox";
import { AppContext } from "../../../context/appContext";
import toaster from "../../toaster";

const Actions = ({
  data,
  navigation,
}: {
  data: IdentificationType;
  navigation: any;
}) => {  
  const { onDeleteIdentification } = useContext(AppContext);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleCopyPassword = async () => {
    await Clipboard.setStringAsync(data.password);
  };
  const handleCopyEmail = async () => {
    await Clipboard.setStringAsync(data.username);
  };
  const handleCopyTwoFactorCode = async () => {
    await Clipboard.setStringAsync(data.twoFactorCode);
  };

  const handleDelete = async () => {
    const result = await onDeleteIdentification!(data._id as string);

    if (result && result.error) {
      console.log(result);
    } else {
      toaster("success", "Suppression", "Identification supprimée");
      navigation.navigate("Home");
    }
  };

  return (
    <>
      <View style={identificationStyles.actionHeaderContainer}>
        <IdentificationImage name={data.name} />
      </View>
      <View style={identificationStyles.actionBodyContainer}>
        <TouchableOpacity
          style={identificationStyles.actionBodyTextContainer}
          onPress={handleCopyEmail}
        >
          <MaterialIcons name="content-copy" size={30} color={COLORS.blue} />
          <Text style={identificationStyles.actionBodyText}>
            Copier l'adresse e-mail
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={identificationStyles.actionBodyTextContainer}
          onPress={handleCopyPassword}
        >
          <MaterialIcons name="content-copy" size={30} color={COLORS.blue} />
          <Text style={identificationStyles.actionBodyText}>
            Copier le mot de passe
          </Text>
        </TouchableOpacity>
        {data.twoFactorCode && (
          <TouchableOpacity
            style={identificationStyles.actionBodyTextContainer}
            onPress={handleCopyTwoFactorCode}
          >
            <MaterialIcons name="content-copy" size={30} color={COLORS.blue} />
            <Text style={identificationStyles.actionBodyText}>
              Copier le 2FA code
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={identificationStyles.actionBodyTextContainer}
          onPress={() => navigation.navigate("Add", { data: data })}
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
        action={handleDelete}
      />
    </>
  );
};

export default Actions;
