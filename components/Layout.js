import React from "react";
import { View, StatusBar, StyleSheet } from "react-native";

const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4c31c4" />
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    backgroundColor: "#4c31c4",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: "#ffffff",
    fontSize: 20,
    textAlign: "center",
    marginTop: 10
  }
});

export default Layout;
