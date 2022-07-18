import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { BarChart } from "react-native-chart-kit";
import Layout from "../components/Layout";
import { getDashboardPreferences } from "../apis/request.api";
import { useIsFocused } from "@react-navigation/native";

const PreferenceChartScreen = () => {
  const isFocused = useIsFocused();
  const titleText = "RESULTADOS";
  const bodyText = `PREFERENCIAS MUSICALES: ${new Date()
    .toISOString()
    .slice(0, 10)}`;

  const [chartPreference, setChartPreference] = useState({
    labels: [],
    datasets: [{ data: [] }]
  });

  const loadPreferenceChart = async () => {
    const preferencesData = await getDashboardPreferences();
    const labels = preferencesData.map(({ name }) => name);
    const data = preferencesData.map(({ totalLikes }) => totalLikes);
    return { labels, datasets: [{ data }] };
  };
  useEffect(() => {
    (async () => {
      const preferencesData = await loadPreferenceChart();
      setChartPreference(preferencesData);
    })();
  }, [isFocused]);

  const chartConfig = {
    backgroundGradientFrom: "#9df6ff",
    backgroundGradientFromOpacity: 0.3,
    backgroundGradientTo: "#3092a9",
    backgroundGradientToOpacity: 0.85,
    color: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 10, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false // optional
  };

  return (
    <Layout>
      <View>
        <Text style={styles.baseText}>
          <Text style={styles.titleText}>
            {titleText}
            {"\n"}
          </Text>
          <Text style={styles.bodyText} numberOfLines={2}>
            {bodyText}
          </Text>
        </Text>
        <BarChart
          yAxisInterval={0.1}
          style={{
            alignSelf: "center",
            marginRight: 15,
            marginLeft: 15,
            borderRadius: 12
          }}
          data={chartPreference}
          width={Dimensions.get("window").width * 0.95}
          height={500}
          chartConfig={chartConfig}
          verticalLabelRotation={60}
        />
      </View>
    </Layout>
  );
};
const styles = StyleSheet.create({
  layout: {
    alignItems: "center",
    justifyContent: "center"
  },
  baseText: {
    fontFamily: "Arial",
    marginBottom: 10
  },
  titleText: {
    marginBottom: 10,
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff"
  },
  bodyText: {
    paddingTop: 20,
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
  }
});

export default PreferenceChartScreen;
