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
import { useContext, useEffect, useRef, useState } from "react";
import { authStyles } from "../../styles/auth/authStyles";
import { COLORS } from "../../assets/COLORS";
import { identificationStyles } from "../../styles/app/identificationStyles";
import HeaderRightButton from "../../components/app/identification/HeaderRightButton";
import AddPasswordGeneratorModal from "../../components/modals/AddPasswordGeneratorModal";
import { AppContext } from "../../context/appContext";
import toaster from "../../components/toaster";

const AddIdentifications = ({ navigation, route }: { navigation: any; route: any }) => {
  const { onCreateIdentification, onUpdateIdentification } =
    useContext(AppContext);

  const formRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const data = route.params?.data;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: data ? "Modifier l'identifiant" : "Ajouter un identifiant",
      headerRight: () => <HeaderRightButton formRef={formRef} />,
    });
  }, []);

  const showToast = (status: string) => {
    if (status == "Modification")
      toaster("success", "Modification", "Identification modifiée");
    else toaster("success", "Création", "Identification ajoutée");
  };

  return (
    <>
      <Formik
        initialValues={{
          name: data ? data.name : "",
          url: data ? data.url : "",
          username: data ? data.username : "",
          password: data ? data.password : "",
          twoFactorCode: data ? data.twoFactorCode : "",
        }}
        validationSchema={identificationFormStruct}
        enableReinitialize={true}
        innerRef={formRef}
        onSubmit={async (values) => {
          const { name, url, username, password, twoFactorCode } = values;

          const object = {
            name,
            url,
            username,
            password,
            twoFactorCode,
            category: "Identification",
          };

          if (object.twoFactorCode == "") {
            delete object.twoFactorCode;
          }

          const result = data
            ? await onUpdateIdentification!(data._id, object)
            : await onCreateIdentification!(object);

          if (result && result.error) {
            console.log(result.message);
          } else {
            showToast(data ? "Modification" : "Création");
            navigation.navigate("Home");
          }
        }}
      >
        {({ handleChange, setFieldTouched, touched, values, errors }) => (
          <ScrollView
            contentContainerStyle={identificationStyles.formContainer}
          >
            <View style={identificationStyles.formInputContainer}>
              <TextInput
                style={identificationStyles.formInputText}
                placeholder="Nom du site web *"
                onBlur={() => setFieldTouched("name")}
                onChangeText={handleChange("name")}
                value={values.name}
              />
            </View>
            {touched.name && errors.name && (
              <View style={authStyles.errorMsgContainer}>
                <Text style={authStyles.errorMsgText}>
                  {(errors as any).name}
                </Text>
              </View>
            )}

            <View style={identificationStyles.formInputContainer}>
              <TextInput
                style={identificationStyles.formInputText}
                autoCapitalize="none"
                placeholder="URL (https://www.example.com) *"
                keyboardType="url"
                onBlur={() => setFieldTouched("url")}
                onChangeText={handleChange("url")}
                value={values.url}
              />
            </View>
            {touched.url && errors.url && (
              <View style={authStyles.errorMsgContainer}>
                <Text style={authStyles.errorMsgText}>
                  {(errors as any).url}
                </Text>
              </View>
            )}

            <View style={identificationStyles.formInputContainer}>
              <TextInput
                style={identificationStyles.formInputText}
                autoCapitalize="none"
                placeholder="Nom d'utilisateur *"
                keyboardType="email-address"
                onBlur={() => setFieldTouched("username")}
                onChangeText={handleChange("username")}
                value={values.username}
              />
            </View>
            {touched.username && errors.username && (
              <View style={authStyles.errorMsgContainer}>
                <Text style={authStyles.errorMsgText}>
                  {(errors as any).username}
                </Text>
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
                    width: "65%",
                  },
                ]}
              >
                <TextInput
                  style={identificationStyles.formInputText}
                  autoCapitalize="none"
                  placeholder="Mot de passe *"
                  secureTextEntry={!showPassword}
                  onBlur={() => setFieldTouched("password")}
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
            {touched.password && errors.password && (
              <View style={authStyles.errorMsgContainer}>
                <Text style={authStyles.errorMsgText}>
                  {(errors as any).password}
                </Text>
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

export default AddIdentifications;
