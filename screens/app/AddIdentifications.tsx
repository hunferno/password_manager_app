import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Formik, type FormikErrors } from "formik";
import { identificationFormStruct } from "../../models/identificationFormStruct";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useContext, useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { authStyles } from "../../styles/auth/authStyles";
import { COLORS } from "../../assets/COLORS";
import { identificationStyles } from "../../styles/app/identificationStyles";
import HeaderRightButton from "../../components/app/identification/HeaderRightButton";
import AddPasswordGeneratorModal from "../../components/modals/AddPasswordGeneratorModal";
import { AppContext } from "../../context/appContext";
import toaster from "../../components/toaster";
import * as Clipboard from "expo-clipboard";
import { createTextFromLetter } from "../../lib/services/createTextFromLetter";
import HeaderRightButtonEdit from "../../components/app/identification/HeaderRightButtonEdit";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AppStackParamList } from "../../navigators/navigationTypes";

type AddIdentificationsScreenProps = NativeStackScreenProps<
  AppStackParamList,
  "AddIdentifications"
>;

type IdentificationFormValues = {
  name: string;
  url: string;
  username: string;
  password: string;
  twoFACode: string;
};

const AddIdentifications = ({
  navigation,
  route,
}: AddIdentificationsScreenProps) => {
  const { onCreateIdentification, onUpdateIdentification } =
    useContext(AppContext);
  const insets = useSafeAreaInsets();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const data = route.params?.data;
  const readOnly = route.params?.readOnly;

  const formRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [readOnlyPassword, setReadOnlyPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  useEffect(() => {
    let title = "Ajouter un identifiant";
    if (data && !readOnly) {
      title = "Modifier l'identifiant";
    } else if (data && readOnly) {
      title = "Détails de l'identifiant";
    }
    navigation.setOptions({
      headerTitle: title,
      headerRight: () =>
        !readOnly ? (
          <HeaderRightButton formRef={formRef} />
        ) : data ? (
          <HeaderRightButtonEdit data={data} location="AddIdentifications" />
        ) : undefined,
    });
  }, [readOnly, data]);

  const showToast = (status: string) => {
    if (status == "Modification")
      toaster("success", "Modification", "Identification modifiée");
    else toaster("success", "Création", "Identification ajoutée");
  };

  const handleCopyPassword = async () => {
    if (data?.password) await Clipboard.setStringAsync(data.password);
  };

  return (
    <>
      <Formik
        initialValues={{
          name: data ? data.name : "",
          url: data ? data.url : "",
          username: data ? data.username : "",
          password: data ? data.password : "",
          twoFACode: data ? data.twoFACode : "",
        }}
        validationSchema={identificationFormStruct}
        enableReinitialize={true}
        innerRef={formRef}
        onSubmit={async (values) => {
          const { name, url, username, password, twoFACode } = values;

          const object = {
            name,
            url,
            username,
            password,
            twoFACode,
            category: "Identification",
          };

          const id = data?._id;
          const result = data && id
            ? await onUpdateIdentification!(id, object)
            : await onCreateIdentification!(object);

          const isError =
            result &&
            typeof result === "object" &&
            "error" in result &&
            (result as { error: boolean }).error;
          if (isError) {
            console.log((result as { message?: string }).message);
          } else {
            showToast(data ? "Modification" : "Création");
            navigation.navigate("ScreenStack", { screen: "Home", params: {} });
          }
        }}
      >
        {({ handleChange, setFieldTouched, touched, values, errors }) => (
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
          >
            <ScrollView
              contentContainerStyle={[
                identificationStyles.formContainer,
                {
                  flexGrow: 1,
                  paddingBottom: keyboardVisible ? 40 : insets.bottom + 20,
                },
              ]}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
            <View style={identificationStyles.formInputContainer}>
              <TextInput
                editable={!readOnly}
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
                  {(errors as FormikErrors<IdentificationFormValues>).name}
                </Text>
              </View>
            )}

            <View style={identificationStyles.formInputContainer}>
              <TextInput
                editable={!readOnly}
                style={identificationStyles.formInputText}
                autoCapitalize="none"
                placeholder="URL (www.example.com) *"
                keyboardType="url"
                onBlur={() => setFieldTouched("url")}
                onChangeText={handleChange("url")}
                value={values.url}
              />
            </View>
            {touched.url && errors.url && (
              <View style={authStyles.errorMsgContainer}>
                <Text style={authStyles.errorMsgText}>
                  {(errors as FormikErrors<IdentificationFormValues>).url}
                </Text>
              </View>
            )}

            <View style={identificationStyles.formInputContainer}>
              <TextInput
                editable={!readOnly}
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
                  {(errors as FormikErrors<IdentificationFormValues>).username}
                </Text>
              </View>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {readOnly ? (
                <View
                  style={[
                    identificationStyles.formInputContainer,
                    {
                      flexDirection: "row",
                      width: "70%",
                      justifyContent: "space-between",
                    },
                  ]}
                >
                  <View style={{ flexDirection: "row" }}>
                    {values.password
                      .split("")
                      .map((letter: string, index: number) => {
                        if (!readOnlyPassword) {
                          return createTextFromLetter(index, "*", 14);
                        } else {
                          return createTextFromLetter(index, letter, 14);
                        }
                      })}
                  </View>

                  <TouchableOpacity
                    onPress={() => setReadOnlyPassword(!readOnlyPassword)}
                  >
                    <Entypo
                      name={readOnlyPassword ? "eye" : "eye-with-line"}
                      size={30}
                      color={COLORS.blue}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={[
                    identificationStyles.formInputContainer,
                    {
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "70%",
                    },
                  ]}
                >
                  <TextInput
                    style={[
                      identificationStyles.formInputText,
                      { fontSize: 14, fontWeight: "bold" },
                    ]}
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
              )}
              {!readOnly ? (
                <TouchableOpacity
                  style={identificationStyles.formPasswordGenerateContainer}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={identificationStyles.formPasswordGenerateText}>
                    Générer
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleCopyPassword}
                  style={{ marginLeft: 20 }}
                >
                  <MaterialIcons
                    name="content-copy"
                    size={30}
                    color={COLORS.blue}
                  />
                </TouchableOpacity>
              )}
            </View>
            {touched.password && errors.password && (
              <View style={authStyles.errorMsgContainer}>
                <Text style={authStyles.errorMsgText}>
                  {(errors as FormikErrors<IdentificationFormValues>).password}
                </Text>
              </View>
            )}

            <View style={identificationStyles.formInputContainer}>
              <TextInput
                editable={!readOnly}
                style={identificationStyles.formInputText}
                autoCapitalize="none"
                placeholder="Code à 2 facteurs"
                keyboardType="default"
                onChangeText={handleChange("twoFACode")}
                value={values.twoFACode}
              />
            </View>
            </ScrollView>
          </KeyboardAvoidingView>
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
