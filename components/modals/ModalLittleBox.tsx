import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { modalStyles } from "../../styles/app/modalStyles";
import { appStyles } from "../../styles/app/appStyles";

const ModalLittleBox = ({
  modalVisible,
  setModalVisible,
  action,
}: {
  modalVisible: any;
  setModalVisible: any;
  action: any;
}) => {
  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={modalStyles.generatePasswordbackDrop} />
        </TouchableWithoutFeedback>

        <View style={modalStyles.logoutModalContainer}>
          <Text style={appStyles.modalText}>
            Êtes-vous sûr de vouloir vous déconnecter ?
          </Text>

          <View style={appStyles.modalBtnContainer}>
            <TouchableOpacity
              style={appStyles.modalBtn}
              onPress={() => {
                setModalVisible(false);
                action();
              }}
            >
              <Text style={appStyles.modalBtnText}>Oui</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={appStyles.modalBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={appStyles.modalBtnText}>Non</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalLittleBox;
