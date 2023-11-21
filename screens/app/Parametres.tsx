import { View } from "react-native";
import { useContext, useState } from "react";
import * as Clipboard from "expo-clipboard";
import { version } from "../../package.json";
import { parameterStyles } from "../../styles/app/parameters/parameterStyles";
import ParameterAction from "../../components/parameter/ParameterAction";
import ModalLittleBox from "../../components/modals/ModalLittleBox";
import { AuthContext } from "../../context/authContext";

const Parametres = () => {
  const {
    onLogout,
    activeBioConnexion,
    desactiveBioConnexion,
    isBioConnexionActive,
  } = useContext(AuthContext);
  
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [bioModalVisible, setBioModalVisible] = useState(false);

  const params = [
    {
      title: "Modifer mon mot de passe",
      description:
        "Modifier le mot de passe qui vous permet de vous connecter à votre compte",
      action: () => {},
    },
    {
      title: "Dévérouillage biométrique",
      description:
        "Dévérouillez l'application à l'aide de votre empriente digitale",
      action: () => {
        setBioModalVisible(true);
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
          title={param.title}
          description={param.description}
          action={param.action}
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
    </View>
  );
};

export default Parametres;
