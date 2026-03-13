import { View, Text, Modal, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { modalStyles } from "../../styles/app/modalStyles";
import { appStyles } from "../../styles/app/appStyles";

export type ModalLittleBoxProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalText: string;
  action: () => void;
};

const ModalLittleBox = ({
  modalVisible,
  setModalVisible,
  modalText,
  action,
}: ModalLittleBoxProps) => {
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
        <Pressable onPress={() => setModalVisible(false)}>
          <View style={modalStyles.generatePasswordbackDrop} />
        </Pressable>

        <View style={modalStyles.logoutModalContainer}>
          <Text style={appStyles.modalText}>{modalText}</Text>

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
