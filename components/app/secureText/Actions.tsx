import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { identificationStyles } from "../../../styles/app/identificationStyles";
import { COLORS } from "../../../assets/COLORS";
import { useContext, useState } from "react";
import ModalLittleBox from "../../modals/ModalLittleBox";
import { AppContext } from "../../../context/appContext";
import toaster from "../../toaster";
import { secureTextStyles } from "../../../styles/app/secureTextStyles";
import { SecureTextType } from "../../../types/secureTextType";
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
  data: SecureTextType;
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
  const { onDeleteSecureText } = useContext(AppContext);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDelete = async () => {
    const id = data._id;
    if (!id) return;
    const result = await onDeleteSecureText!(id);

    if (isApiError(result)) {
      console.log(result.message);
    } else {
      toaster("success", "Suppression", "Note supprimée");
      setReload(!reload);
      handleActionModalClose();
      navigation.navigate("ScreenStack", { screen: "SecureText" });
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
            navigation.navigate("AddSecureText", { data, readOnly: false });
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
