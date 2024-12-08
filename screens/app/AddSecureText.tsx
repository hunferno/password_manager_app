import { useContext, useEffect, useRef, useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import HeaderRightButton from "../../components/app/identification/HeaderRightButton";
import { AppContext } from "../../context/appContext";
import toaster from "../../components/toaster";
import { Formik } from "formik";
import { secureTextForm } from "../../models/secureTextFormStruct";
import { secureTextStyles } from "../../styles/app/secureTextStyles";
import { authStyles } from "../../styles/auth/authStyles";
import moment from "moment";
import "moment/min/locales";
import HeaderRightButtonEdit from "../../components/app/identification/HeaderRightButtonEdit";

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
  const readOnly = route.params?.readOnly;

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
        ) : (
          <HeaderRightButtonEdit data={data} location="AddSecureText" />
        ),
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
                  {(errors as any).title}
                </Text>
              </View>
            )}
            <ScrollView contentContainerStyle={secureTextStyles.noteContainer}>
              <TextInput
                editable={!readOnly}
                style={secureTextStyles.noteText}
                placeholder="Votre note sécurisée *"
                onBlur={() => setFieldTouched("text")}
                onChangeText={handleChange("text")}
                value={values.text}
                multiline={true}
              />
            </ScrollView>
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
          </View>
        )}
      </Formik>
    </>
  );
};

export default AddSecureText;
