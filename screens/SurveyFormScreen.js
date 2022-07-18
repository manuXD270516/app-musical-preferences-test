import React, { useEffect, useState, useCallback } from "react";

import { TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import Layout from "../components/Layout";
import DropDownPicker from "react-native-dropdown-picker";
import { useIsFocused } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import {
  getMusicalStyles,
  saveMusicalPreferenceUser,
  saveUser
} from "../apis/request.api";

//{ navigation, route }
const SurveyFormScreen = () => {
  const titleText = "ENCUESTA";
  const bodyText = "ESTILO MUSICAL";
  const emailLabel = "CORREO ELECTRONICO";
  const isFocused = useIsFocused();
  const toast = useToast();

  const loadMusicalStyles = async () => {
    const musicalStylesResponse = await getMusicalStyles();
    const mapItems = musicalStylesResponse.map(
      ({ musicalStyleId: value, name: label }) => ({
        label,
        value
      })
    );
    setMusicalStyles(musicalStylesResponse);
    setItems(mapItems);
  };

  const [user, setUser] = useState({ email: "" });
  const [preference, setPreference] = useState({
    userId: null,
    musicalStyleId: null
  });

  const [musicalStyles, setMusicalStyles] = useState([]);
  const [editing, setEditing] = useState(false);

  // if (route && route.params) {
  //   navigation.setOptions({ headerTitle: "Updating Task" });
  // }

  useEffect(() => {
    loadMusicalStyles();
    setMusicalStyleSelected(false);
  }, [isFocused]);

  const handleSubmitWithCallback = useCallback(async () => {
    try {
      let {
        data: { id: userId }
      } = await saveUser(user);
      //console.log(userId);
      //console.log("before update state....", preference);
      setPreference(
        (pref) => (pref = { userId, musicalStyleId: valueMusicalStyle })
      );
      //console.log("alternative object {..}, ", preference);
      //await setPreference(c);
      //console.log("after update state......", preference);
      let res = await saveMusicalPreferenceUser(preference);
      //console.log(res);
      toast.show("Preferencia registrada correctamente", {
        type: "success",
        placement: "bottom",
        duration: 4000,
        offset: 10,
        animationType: "slide-in"
      });
      //rsetUser({ email: "" });
      /* if (!editing) {
        await saveTask(preference);
      } else {
        console.log(route.params.id, preference);
        await updateTask(route.params.id, { ...preference });
      } */
      //navigation.navigate("HomeScreen");
      //console.log("finish ......", preference);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmitAsync = () => {
    (async () => {
      let {
        data: { id: userId }
      } = await saveUser(user);
      setPreference(
        (pref) => (pref = { userId: userId, musicalStyleId: valueMusicalStyle })
      );
      const obj = { userId, musicalStyleId: valueMusicalStyle };
      let res = await saveMusicalPreferenceUser(obj);
      if (res.status == 200) {
        toast.show("Preferencia registrada correctamente", {
          type: "success",
          placement: "bottom",
          duration: 4000,
          offset: 10,
          animationType: "slide-in"
        });
        setUser({ email: "" });
        setEnableSubmit(false);
      } else {
        toast.show(
          "Ocurrio un error, el correo debe contener un dominio de al menos 2 caracteres",
          {
            type: "danger",
            placement: "bottom",
            duration: 4000,
            offset: 10,
            animationType: "slide-in"
          }
        );
      }
    })();
  };

  /* const handleChange = (name, value) =>
    setPreference({ ...preference, [name]: value }); */

  const [open, setOpen] = useState(false);
  const [valueMusicalStyle, setValueMusicalStyle] = useState(null);
  const [items, setItems] = useState([]);
  const [emailValid, setEmailValid] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [musicalStyleSelected, setMusicalStyleSelected] = useState(false);

  const onChangeDropDown = () => {
    setMusicalStyleSelected(true);
  };

  const validateEmail = (text) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let patterIsValid = reg.test(text);
    setEmailValid((pattern) => (pattern = patterIsValid));
    setUser((usr) => (usr = { email: text }));
    let submitValidate = reg.test(text) && musicalStyleSelected;
    setEnableSubmit(submitValidate);
  };

  return (
    <Layout>
      <Text style={styles.baseText}>
        <Text style={styles.titleText}>
          {titleText}
          {"\n"}
        </Text>
        <Text style={styles.bodyText} numberOfLines={2}>
          {bodyText}
        </Text>
      </Text>

      <DropDownPicker
        style={styles.dropDown}
        open={open}
        value={valueMusicalStyle}
        items={items}
        setOpen={setOpen}
        setValue={setValueMusicalStyle}
        setItems={setItems}
        onChangeValue={onChangeDropDown}
      />

      <Text style={styles.bodyTextEmail} numberOfLines={2}>
        {emailLabel}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="test@domain.com"
        placeholderTextColor="#576574"
        value={user.email}
        onChangeText={
          (text) => validateEmail(text) /*handleChange("email", text)*/
        }
      />
      {!emailValid && user.email?.length > 0 ? (
        <Text style={styles.bodyTextErrorEmail} numberOfLines={2}>
          Email invalido, intente nuevamente.
        </Text>
      ) : null}
      {enableSubmit ? (
        <TouchableOpacity style={styles.buttonSave} onPress={handleSubmitAsync}>
          <Text style={styles.buttonText}>REGISTRAR</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.buttonDisabled} disabled={true}>
          <Text style={styles.buttonText}>REGISTRAR</Text>
        </TouchableOpacity>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    alignItems: "center",
    justifyContent: "center"
  },
  bodyTextErrorEmail: {
    fontSize: 14,
    backgroundColor: "#e0535f",
    textAlign: "center",
    color: "#ffffff"
  },
  baseText: {
    fontFamily: "Arial"
  },
  bodyText: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff"
  },
  bodyTextEmail: {
    marginTop: 30,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff"
  },
  titleText: {
    marginBottom: 10,
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff"
  },
  input: {
    width: "80%",
    marginTop: 20,
    backgroundColor: "#ffffff",
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#10ac84",
    height: 40,
    color: "black",
    textAlign: "center",
    padding: 2,
    borderRadius: 5
  },
  buttonSave: {
    marginTop: 55,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 3,
    backgroundColor: "#10ac84",
    width: "80%"
  },
  buttonDisabled: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 3,

    backgroundColor: "#adaaaa",
    width: "80%"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18
  },
  dropDown: {
    marginTop: 20,
    width: "80%",
    alignSelf: "center",
    alignItems: "center"
  }
});

export default SurveyFormScreen;
