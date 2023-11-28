import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useState } from "react";
import { modalStyles } from "../../styles/app/modalStyles";
import { Formik } from "formik";
import { AppContext } from "../../context/appContext";
import toaster from "../toaster";
import { updateUserFormStruct } from "../../models/updateUserFormStruct";
import { Entypo } from "@expo/vector-icons";
import { COLORS } from "../../assets/COLORS";

const UpdateUserModal = ({
  changePasswordModalVisible,
  setChangePasswordModalVisible,
}: {
  changePasswordModalVisible: any;
  setChangePasswordModalVisible: any;
}) => {
  const { onUpdateUser } = useContext(AppContext);

  const [updateMsgErr, setUpdateMsgErr] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={changePasswordModalVisible}
      onRequestClose={() => {
        setChangePasswordModalVisible(false);
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => setChangePasswordModalVisible(false)}
      >
        <View style={modalStyles.generatePasswordbackDrop} />
      </TouchableWithoutFeedback>

      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }}
        validationSchema={updateUserFormStruct}
        enableReinitialize
        onSubmit={async (values) => {
          const result = await onUpdateUser!(values);

          if (result && result.error) {
            setUpdateMsgErr(result.message);
            return;
          }

          toaster(
            "success",
            "Modifer vos informations",
            "Mot de passe modifié avec succès"
          );
          setChangePasswordModalVisible(false);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          setFieldTouched,
          touched,
          values,
          errors,
        }) => (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View style={modalStyles.updateUserContainer}>
              <Text style={[modalStyles.modalText, { textAlign: "center" }]}>
                Modifier votre mot de passe
              </Text>

              {updateMsgErr !== "" && (
                <Text
                  style={[modalStyles.updateErrorText, { textAlign: "center" }]}
                >
                  {updateMsgErr}
                </Text>
              )}

              <View>
                <View style={modalStyles.updateInputContainer}>
                  <TextInput
                    style={modalStyles.updateInput}
                    onChangeText={handleChange("oldPassword")}
                    onBlur={() => setFieldTouched("oldPassword")}
                    value={values.oldPassword}
                    placeholder="Ancien mot de passe"
                    secureTextEntry={!showOldPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowOldPassword(!showOldPassword)}
                  >
                    <Entypo
                      name={showOldPassword ? "eye" : "eye-with-line"}
                      size={30}
                      color={COLORS.blue}
                    />
                  </TouchableOpacity>
                </View>
                {touched.oldPassword && errors.oldPassword && (
                  <Text style={modalStyles.updateErrorText}>
                    {errors.oldPassword}
                  </Text>
                )}

                <View style={modalStyles.updateInputContainer}>
                  <TextInput
                    style={modalStyles.updateInput}
                    onChangeText={handleChange("newPassword")}
                    onBlur={() => setFieldTouched("newPassword")}
                    value={values.newPassword}
                    placeholder="Nouveau mot de passe"
                    secureTextEntry={!showNewPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowNewPassword(!showNewPassword)}
                  >
                    <Entypo
                      name={showNewPassword ? "eye" : "eye-with-line"}
                      size={30}
                      color={COLORS.blue}
                    />
                  </TouchableOpacity>
                </View>
                {touched.newPassword && errors.newPassword && (
                  <Text style={modalStyles.updateErrorText}>
                    {errors.newPassword}
                  </Text>
                )}

                <View style={modalStyles.updateInputContainer}>
                  <TextInput
                    style={modalStyles.updateInput}
                    onChangeText={handleChange("confirmNewPassword")}
                    onBlur={() => setFieldTouched("confirmNewPassword")}
                    value={values.confirmNewPassword}
                    placeholder="Confirmer le nouveau mot de passe"
                    secureTextEntry={!showConfirmNewPassword}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      setShowConfirmNewPassword(!showConfirmNewPassword)
                    }
                  >
                    <Entypo
                      name={showConfirmNewPassword ? "eye" : "eye-with-line"}
                      size={30}
                      color={COLORS.blue}
                    />
                  </TouchableOpacity>
                </View>
                {touched.confirmNewPassword && errors.confirmNewPassword && (
                  <Text style={modalStyles.updateErrorText}>
                    {errors.confirmNewPassword}
                  </Text>
                )}
              </View>

              <View style={modalStyles.updateModalBtnContainer}>
                <TouchableOpacity
                  style={modalStyles.updateModalBtn}
                  onPress={() => setChangePasswordModalVisible(false)}
                >
                  <Text style={modalStyles.modalBtnText}>Annuler</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={modalStyles.updateModalBtn}
                  onPress={() => {
                    handleSubmit();
                  }}
                >
                  <Text style={modalStyles.modalBtnText}>Envoyer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </Modal>
  );
};

export default UpdateUserModal;
