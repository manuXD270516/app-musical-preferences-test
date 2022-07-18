import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Alert,
  RefreshControl,
  Dimensions
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { getOptionsData } from "../apis/request.api";
import OptionItem from "./OptionItem";

const OptionsList = ({ navigation }) => {
  const [options, setOptions] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();

  const getOptions = async () => {
    try {
      const options = await getOptionsData();
      setOptions(options);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    // wait(2000).then(() => setRefreshing(false));
    await getOptions();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getOptions();
    console.log("called");
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <OptionItem
      optionTitle={item.optionTitle}
      linkNavigate={item.linkNavigate}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, width: "100%" }}>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          marginLeft: "10%"
        }}
        data={options}
        renderItem={renderItem}
        keyExtractor={(item) => item.optionTitle}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#78e08f"]}
            progressBackgroundColor="#0a3d62"
          />
        }
      />
    </SafeAreaView>
  );
};

export default OptionsList;
