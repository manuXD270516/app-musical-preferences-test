import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const OptionItem = ({ optionTitle, linkNavigate }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.buttonOption}
      onPress={() => navigation.navigate(linkNavigate)}
    >
      <Text style={styles.buttonOptionText}>{optionTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#333333",
    padding: 20,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5
  },
  itemTitle: {
    color: "#ffffff"
  },
  buttonOption: {
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: "center",
    backgroundColor: "#10ac84",
    width: "90%",
    height: 80
  },
  buttonOptionText: {
    color: "#ffffff",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold"
  }
});
export default OptionItem;
