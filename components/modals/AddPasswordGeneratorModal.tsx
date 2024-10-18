import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Switch,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { modalStyles } from "../../styles/app/modalStyles";
import { COLORS } from "../../assets/COLORS";

const AddPasswordGeneratorModal = ({
  modalVisible,
  setModalVisible,
  formRef,
}: {
  modalVisible: any;
  setModalVisible: any;
  formRef: any;
}) => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);
  const [isLetters, setIsLetters] = useState(true);
  const [isNumbers, setIsNumbers] = useState(true);
  const [isSymbols, setIsSymbols] = useState(true);

  const generatePassword = () => {
    let result = "";

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%&_?-";

    let characters = "";

    if (isLetters) {
      characters += letters;
    }
    if (isNumbers) {
      characters += numbers;
    }
    if (isSymbols) {
      characters += symbols;
    }

    for (let i = 0; i < passwordLength; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    setPassword(result);
  };
  const generateBorderBottomColor = () => {
    if (password.length <= 5) {
      return COLORS.failure;
    } else if (password.length <= 9) {
      return COLORS.warning;
    } else if (password.length > 9) {
      return COLORS.success;
    }
  };
  const generateSecurityText = () => {
    if (password.length <= 5) {
      return "Pas mal, mais on peut faire mieux.";
    } else if (password.length <= 9) {
      return "Voila un bon mot de passe en béton.";
    } else if (password.length > 9) {
      return "On ne peut pas faire plus robuste.";
    }
  };
  const handleUseGeneratePassword = () => {
    formRef.current &&
      (formRef.current as any)?.setFieldValue("password", password);
    setModalVisible(false);
  };

  useEffect(() => {
    generatePassword();
  }, [passwordLength, isLetters, isNumbers, isSymbols]);

  return (
    <Modal
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={modalStyles.generatePasswordbackDrop} />
      </TouchableWithoutFeedback>
      <View style={modalStyles.generatePasswordContainer}>
        <View style={modalStyles.generateHeaderContainer}>
          <View
            style={[
              modalStyles.generateHeaderInfoContainer,
              {
                borderBottomColor: generateBorderBottomColor(),
              },
            ]}
          >
            <View style={{ width: "90%" }}>
              <Text style={modalStyles.modalPasswordText}>{password}</Text>
            </View>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => generatePassword()}
            >
              <Ionicons name="reload-outline" size={24} color={COLORS.blue} />
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 15, marginVertical: 10 }}>
            <Text
              style={[
                modalStyles.modalText,
                { fontWeight: "bold", fontStyle: "italic" },
              ]}
            >
              {generateSecurityText()}
            </Text>
          </View>
        </View>

        <View style={modalStyles.generateBodyContainer}>
          <Text style={modalStyles.modalText}>
            Longueur : ({passwordLength})
          </Text>
          <View style={modalStyles.generateSliderContainer}>
            <Text style={modalStyles.modalText}>Min</Text>
            <Slider
              style={{ width: "85%" }}
              step={1}
              minimumValue={4}
              maximumValue={25}
              minimumTrackTintColor={COLORS.blue}
              maximumTrackTintColor={COLORS.grey}
              thumbTintColor={COLORS.blue}
              value={passwordLength}
              onValueChange={(value) => setPasswordLength(value)}
            />
            <Text style={modalStyles.modalText}>Max</Text>
          </View>
          <View style={modalStyles.generateSwitchContainer}>
            <Text style={modalStyles.modalText}>Chiffres (ex. 123)</Text>
            <Switch
              disabled={!isNumbers}
              trackColor={{ false: COLORS.grey, true: COLORS.lightBlue }}
              thumbColor={isLetters ? COLORS.grey : COLORS.lightBlue}
              value={isLetters}
              onValueChange={(value) => setIsLetters(value)}
            />
          </View>
          <View style={modalStyles.generateSwitchContainer}>
            <Text style={modalStyles.modalText}>Lettres (ex. Aa)</Text>
            <Switch
              disabled={!isLetters}
              trackColor={{ false: COLORS.grey, true: COLORS.lightBlue }}
              thumbColor={isNumbers ? COLORS.grey : COLORS.lightBlue}
              value={isNumbers}
              onValueChange={(value) => setIsNumbers(value)}
            />
          </View>
          <View style={modalStyles.generateSwitchContainer}>
            <Text style={modalStyles.modalText}>Symboles (ex. @&$!#?)</Text>
            <Switch
              trackColor={{ false: COLORS.grey, true: COLORS.lightBlue }}
              thumbColor={isSymbols ? COLORS.grey : COLORS.lightBlue}
              value={isSymbols}
              onValueChange={(value) => setIsSymbols(value)}
            />
          </View>
        </View>

        <View style={modalStyles.generateFooterContainer}>
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() => setModalVisible(false)}
          >
            <Text style={modalStyles.modalBtnText}>ANNULER</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() => handleUseGeneratePassword()}
          >
            <Text style={modalStyles.modalBtnText}>UTILISER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddPasswordGeneratorModal;
