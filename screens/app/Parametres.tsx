import { Modal, Switch, View } from "react-native";
import { useContext, useState } from "react";
import * as Clipboard from "expo-clipboard";
import { version } from "../../package.json";
import { parameterStyles } from "../../styles/app/parameters/parameterStyles";
import ParameterAction from "../../components/parameter/ParameterAction";
import ModalLittleBox from "../../components/modals/ModalLittleBox";
import { AuthContext } from "../../context/authContext";
import { COLORS } from "../../assets/COLORS";
import UpdateUserModal from "../../components/modals/UpdateUserModal";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Parametres = () => {
  const {
    onLogout,
    activeBioConnexion,
    desactiveBioConnexion,
    isBioConnexionActive,
  } = useContext(AuthContext);

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [bioModalVisible, setBioModalVisible] = useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] =
    useState(false);

  const params = [
    {
      title: "Modifer mon mot de passe",
      description:
        "Modifier le mot de passe qui vous permet de vous connecter à votre compte",
      action: () => {
        setChangePasswordModalVisible(true);
      },
    },
    {
      title: "Dévérouillage biométrique",
      description:
        "Dévérouillez l'application à l'aide de votre empriente digitale",
      action: () => {
        setBioModalVisible(true);
      },
      extraComponent: () => {
        return (
          <TouchableWithoutFeedback onPress={() => setBioModalVisible(true)}>
            <Switch
              trackColor={{ false: COLORS.blue, true: COLORS.blue }}
              thumbColor={
                isBioConnexionActive ? COLORS.success : COLORS.failure
              }
              value={isBioConnexionActive}
            />
          </TouchableWithoutFeedback>
        );
      },
    },
    {
      title: "Déconnexion",
      description: "Déconnectez vous de l'application",
      action: () => {
        setLogoutModalVisible(true);
      },
    },
    {
      title: "Version",
      description: "1.0.0",
      action: () => {
        Clipboard.setStringAsync(version);
      },
    },
  ];

  return (
    <View style={parameterStyles.container}>
      {params.map((param, index) => (
        <ParameterAction
          key={index}
          index={index}
          title={param.title}
          description={param.description}
          action={param.action}
          extraComponent={param.extraComponent}
        />
      ))}

      <ModalLittleBox
        modalVisible={logoutModalVisible}
        setModalVisible={setLogoutModalVisible}
        modalText={"Êtes-vous sûr de vouloir vous déconnecter?"}
        action={onLogout}
      />
      <ModalLittleBox
        modalVisible={bioModalVisible}
        setModalVisible={setBioModalVisible}
        modalText={
          isBioConnexionActive
            ? "Voulez-vous désactiver la connection biométrique?"
            : "Voulez-vous activez la connection biométrique?"
        }
        action={
          isBioConnexionActive ? desactiveBioConnexion : activeBioConnexion
        }
      />
      {changePasswordModalVisible && (
        <UpdateUserModal
          changePasswordModalVisible={changePasswordModalVisible}
          setChangePasswordModalVisible={setChangePasswordModalVisible}
        />
      )}
    </View>
  );
};

export default Parametres;
