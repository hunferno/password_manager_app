import { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderRightButton from "../../components/app/identification/HeaderRightButton";
import { AppContext } from "../../context/appContext";
import toaster from "../../components/toaster";
import { Formik, type FormikErrors } from "formik";
import { secureTextForm } from "../../models/secureTextFormStruct";
import { secureTextStyles } from "../../styles/app/secureTextStyles";
import { authStyles } from "../../styles/auth/authStyles";
import moment from "moment";
import "moment/min/locales";
import HeaderRightButtonEdit from "../../components/app/identification/HeaderRightButtonEdit";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AppStackParamList } from "../../navigators/navigationTypes";

type AddSecureTextScreenProps = NativeStackScreenProps<
  AppStackParamList,
  "AddSecureText"
>;

type SecureTextFormValues = {
  title: string;
  text: string;
};

const AddSecureText = ({ navigation, route }: AddSecureTextScreenProps) => {
  const { onCreateSecureText, onUpdateSecureText } = useContext(AppContext);
  const insets = useSafeAreaInsets();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const formRef = useRef(null);
  const data = route.params?.data;
  const readOnly = route.params?.readOnly;

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
    // Set the locale to French
    moment.locale("fr");

    let title = "Ajouter une note";
    if (data && !readOnly) {
      title = "Modifier la note";
    } else if (data && readOnly) {
      title = "Détails de la note";
    }
    navigation.setOptions({
      headerTitle: title,
      headerRight: () =>
        !readOnly ? (
          <HeaderRightButton formRef={formRef} />
        ) : data ? (
          <HeaderRightButtonEdit data={data} location="AddSecureText" />
        ) : undefined,
    });
  }, [readOnly, data]);

  const showToast = (status: string) => {
    if (status == "Modification")
      toaster("success", "Modification", "Note modifiée");
    else toaster("success", "Création", "Note ajoutée");
  };

  return (
    <>
      <Formik
        initialValues={{
          title: data ? data.title : "",
          text: data ? data.text : "",
        }}
        validationSchema={secureTextForm}
        enableReinitialize={true}
        innerRef={formRef}
        onSubmit={async (values) => {
          const { title, text } = values;
          const object = {
            title,
            text,
            category: "SecureText",
          };
          const id = data?._id;
          const result = data && id
            ? await onUpdateSecureText!(id, object)
            : await onCreateSecureText!(object);
          const isError =
            result &&
            typeof result === "object" &&
            "error" in result &&
            (result as { error: boolean }).error;
          if (isError) {
            console.log((result as { message?: string }).message);
          } else {
            showToast(data ? "Modification" : "Création");
            navigation.navigate("ScreenStack", { screen: "SecureText" });
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
              contentContainerStyle={{
                flexGrow: 1,
                paddingHorizontal: 15,
                paddingBottom: keyboardVisible ? 40 : insets.bottom + 20,
              }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={secureTextStyles.titleContainer}>
                <TextInput
                  editable={!readOnly}
                  style={secureTextStyles.titleText}
                  placeholder="Titre de la note *"
                  onBlur={() => setFieldTouched("title")}
                  onChangeText={handleChange("title")}
                  value={values.title}
                />
              </View>
              {touched.title && errors.title && (
                <View style={authStyles.errorMsgContainer}>
                  <Text style={authStyles.errorMsgText}>
                    {(errors as FormikErrors<SecureTextFormValues>).title}
                  </Text>
                </View>
              )}
              <View style={secureTextStyles.noteContainer}>
                <TextInput
                  editable={!readOnly}
                  style={secureTextStyles.noteText}
                  placeholder="Votre note sécurisée *"
                  onBlur={() => setFieldTouched("text")}
                  onChangeText={handleChange("text")}
                  value={values.text}
                  multiline={true}
                />
              </View>
              {data && (
                <View style={{ marginVertical: 15 }}>
                  <Text style={secureTextStyles.date}>
                    Créé le :{" "}
                    {moment(data.createdAt).format("DD MMMM YYYY [à] HH[h]mm")}{" "}
                  </Text>
                  <Text style={secureTextStyles.date}>
                    Modifié le :{" "}
                    {moment(data.updatedAt).format("DD MMMM YYYY [à] HH[h]mm")}{" "}
                  </Text>
                </View>
              )}
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </>
  );
};

export default AddSecureText;
