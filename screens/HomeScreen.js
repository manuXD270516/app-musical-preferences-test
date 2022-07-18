import React from "react";
import { StyleSheet } from "react-native";
import Layout from "../components/Layout";

import OptionsList from "../components/OptionsList";

const HomeScreen = () => {
  return (
    <Layout styles={styles.layout}>
      <OptionsList />
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    alignItems: "center",
    justifyContent: "center"
  }
});
export default HomeScreen;
