import { View, Text, TouchableOpacity } from "react-native";
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
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppStackParamList } from "../../../navigators/navigationTypes";

function isApiError(
  value: unknown
): value is { error: true; message: string } {
  return (
    value !== null &&
    typeof value === "object" &&
    "error" in value &&
    (value as { error: unknown }).error === true
  );
}

export type ActionsProps = {
  data: IdentificationType;
  navigation: NativeStackNavigationProp<AppStackParamList>;
  handleActionModalClose: () => void;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
};

const Actions = ({
  data,
  navigation,
  handleActionModalClose,
  reload,
  setReload,
}: ActionsProps) => {
  const { onDeleteIdentification } = useContext(AppContext);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleCopyPassword = async () => {
    await Clipboard.setStringAsync(data.password);
  };
  const handleCopyEmail = async () => {
    await Clipboard.setStringAsync(data.username);
  };
  const handleCopyTwoFactorCode = async () => {
    if (data.twoFACode) await Clipboard.setStringAsync(data.twoFACode);
  };

  const handleDelete = async () => {
    const id = data._id;
    if (!id) return;
    const result = await onDeleteIdentification!(id);

    if (isApiError(result)) {
      console.log(result.message);
    } else {
      toaster("success", "Suppression", "Identification supprimée");
      setReload(!reload);
      handleActionModalClose();
      navigation.navigate("ScreenStack", { screen: "Home", params: {} });
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
        {data.twoFACode && (
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
          onPress={() => {
            handleActionModalClose();
            navigation.navigate("AddIdentifications", { data, readOnly: false });
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
        modalText={"Êtes-vous sûr de vouloir supprimer cette identification ?"}
        action={handleDelete}
      />
    </>
  );
};

export default Actions;
