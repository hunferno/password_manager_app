import { useContext, useEffect, useRef } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import HeaderRightButton from "../../components/app/identification/HeaderRightButton";
import { AppContext } from "../../context/appContext";
import toaster from "../../components/toaster";
import { Formik } from "formik";
import { secureTextForm } from "../../models/secureTextFormStruct";
import { secureTextStyles } from "../../styles/app/secureTextStyles";
import { authStyles } from "../../styles/auth/authStyles";

const AddSecureText = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { onCreateSecureText, onUpdateSecureText } = useContext(AppContext);

  const formRef = useRef(null);
  const data = route.params?.data;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: data ? "Modifier l'identifiant" : "Ajouter une note",
      headerRight: () => <HeaderRightButton formRef={formRef} />,
    });
  }, []);

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
          const result = data
            ? await onUpdateSecureText!(data._id, object)
            : await onCreateSecureText!(object);
          if (result && result.error) {
            console.log(result.message);
          } else {
            showToast(data ? "Modification" : "Création");
            navigation.navigate("SecureText");
          }
        }}
      >
        {({ handleChange, setFieldTouched, touched, values, errors }) => (
          <View style={secureTextStyles.formContainer}>
            <View style={secureTextStyles.titleContainer}>
              <TextInput
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
                  {(errors as any).title}
                </Text>
              </View>
            )}
            <ScrollView contentContainerStyle={secureTextStyles.noteContainer}>
              <TextInput
                style={secureTextStyles.noteText}
                placeholder="Votre note sécurisée *"
                onBlur={() => setFieldTouched("text")}
                onChangeText={handleChange("text")}
                value={values.text}
                multiline={true}
              />
            </ScrollView>
          </View>
        )}
      </Formik>
    </>
  );
};

export default AddSecureText;
