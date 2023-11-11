import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Formik } from "formik";
import { identificationFormStruct } from "../../models/identificationFormStruct";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { authStyles } from "../../styles/auth/authStyles";
import { COLORS } from "../../assets/COLORS";
import { identificationStyles } from "../../styles/app/identificationStyles";
import HeaderRightButton from "../../components/app/identification/HeaderRightButton";
import AddPasswordGeneratorModal from "../../components/modals/AddPasswordGeneratorModal";

const AddScreen = ({ navigation }: { navigation: any }) => {
  const formRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRightButton formRef={formRef} />,
    });
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          url: "",
          username: "",
          password: "",
          twoFactorCode: "",
        }}
        validationSchema={identificationFormStruct}
        enableReinitialize={true}
        innerRef={formRef}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, values, errors }) => (
          <ScrollView
            contentContainerStyle={identificationStyles.formContainer}
          >
            <View style={identificationStyles.formInputContainer}>
              <TextInput
                style={identificationStyles.formInputText}
                placeholder="Nom du site web *"
                onChangeText={handleChange("name")}
                value={values.name}
              />
            </View>
            {errors.name && (
              <View style={authStyles.errorMsgContainer}>
                <Text style={authStyles.errorMsgText}>{errors.name}</Text>
              </View>
            )}

            <View style={identificationStyles.formInputContainer}>
              <TextInput
                style={identificationStyles.formInputText}
                autoCapitalize="none"
                placeholder="URL (www.example.com) *"
                keyboardType="url"
                onChangeText={handleChange("url")}
                value={values.url}
              />
            </View>
            {errors.url && (
              <View style={authStyles.errorMsgContainer}>
                <Text style={authStyles.errorMsgText}>{errors.url}</Text>
              </View>
            )}

            <View style={identificationStyles.formInputContainer}>
              <TextInput
                style={identificationStyles.formInputText}
                autoCapitalize="none"
                placeholder="Nom d'utilisateur *"
                keyboardType="email-address"
                onChangeText={handleChange("username")}
                value={values.username}
              />
            </View>
            {errors.username && (
              <View style={authStyles.errorMsgContainer}>
                <Text style={authStyles.errorMsgText}>{errors.username}</Text>
              </View>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={[
                  identificationStyles.formInputContainer,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "75%",
                  },
                ]}
              >
                <TextInput
                  style={identificationStyles.formInputText}
                  autoCapitalize="none"
                  placeholder="Mot de passe *"
                  secureTextEntry={!showPassword}
                  onChangeText={handleChange("password")}
                  value={values.password}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Entypo
                    name={showPassword ? "eye" : "eye-with-line"}
                    size={30}
                    color={COLORS.blue}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={identificationStyles.formPasswordGenerateContainer}
                onPress={() => setModalVisible(true)}
              >
                <Text style={identificationStyles.formPasswordGenerateText}>
                  Générer
                </Text>
              </TouchableOpacity>
            </View>
            {errors.password && (
              <View style={authStyles.errorMsgContainer}>
                <Text style={authStyles.errorMsgText}>{errors.password}</Text>
              </View>
            )}

            <View style={identificationStyles.formInputContainer}>
              <TextInput
                style={identificationStyles.formInputText}
                autoCapitalize="none"
                placeholder="Code à 2 facteurs"
                keyboardType="default"
                onChangeText={handleChange("twoFactorCode")}
                value={values.twoFactorCode}
              />
            </View>
          </ScrollView>
        )}
      </Formik>
      <AddPasswordGeneratorModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        formRef={formRef}
      />
    </>
  );
};

export default AddScreen;
