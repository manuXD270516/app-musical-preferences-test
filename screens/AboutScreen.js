import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Layout from "../components/Layout";

const AboutScreen = () => {
  const titleText = "TECHNICAL TEST";
  const subTitleText = "MUSICAL PREFERENCES";
  const developerName = "MANUEL SAAVEDRA";
  const testType = "REACT NATIVE & SPRING BOOT";
  const factoryText = "3IT - SOFTWARE FACTORY";
  return (
    <Layout styles={styles.layout}>
      <View>
        <Text style={styles.titleText}>{titleText}</Text>
        <Text style={styles.subTitleText}>
          {subTitleText}
          {"\n"}
        </Text>
        <Text style={styles.secondaryText}>
          {developerName}
          {"\n"}
        </Text>
        <Text style={styles.testTypeText}>
          {testType}
          {"\n"}
        </Text>
        <Image style={styles.tinyLogo} source={require("../assets/3it.png")} />
        <Text style={styles.testTypeText}>
          {factoryText}
          {"\n"}
        </Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    alignItems: "center",
    justifyContent: "center"
  },
  tinyLogo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    padding: 10,
    marginBottom: 20
  },
  titleText: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff"
  },
  secondaryText: {
    marginBottom: 10,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff"
  },
  subTitleText: {
    marginBottom: 10,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff"
  },
  testTypeText: {
    marginBottom: 10,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff"
  }
});

export default AboutScreen;
