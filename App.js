/* import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity, View } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";

import HomeScreen from "./screens/HomeScreen";
import SurveyFormScreen from "./screens/SurveyFormScreen";
import PreferenceChartScreen from "./screens/PreferencesChartScreen";
import AboutScreen from "./screens/AboutScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <ToastProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: "MENU PRINCIPAL",
              headerStyle: {
                backgroundColor: "#222f3e"
              },
              headerTitleStyle: {
                color: "#ffffff"
              },
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("SurveyFormScreen")}
                >
                  <Text
                    style={{ color: "#fff", marginRight: 20, fontSize: 15 }}
                  >
                    NUEVO
                  </Text>
                </TouchableOpacity>
              )
            })}
          />
          <Stack.Screen
            name="SurveyFormScreen"
            component={SurveyFormScreen}
            options={{
              title: "PREFERENCIAS MUSICALES",
              headerStyle: {
                backgroundColor: "#222f3e"
              },
              headerTintColor: "#fff",

              headerTitleStyle: {
                color: "#ffffff"
              }
            }}
          />
          <Stack.Screen
            name="PreferencesChartScreen"
            component={PreferenceChartScreen}
            options={{
              title: "DASHBOARD",
              headerStyle: {
                backgroundColor: "#222f3e"
              },
              headerTintColor: "#fff",

              headerTitleStyle: {
                color: "#ffffff"
              }
            }}
          />
          <Stack.Screen
            name="AboutScreen"
            component={AboutScreen}
            options={{
              title: "ACERCA DE",
              headerStyle: {
                backgroundColor: "#222f3e"
              },
              headerTintColor: "#fff",

              headerTitleStyle: {
                color: "#ffffff"
              }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
};

export default App;
