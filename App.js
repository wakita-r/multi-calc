import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Easing,
  Pressable,
} from "react-native";
import Calculator from "./CalculatorScreen";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Box, Menu } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <View style={styles.container}>
      <NativeBaseProvider>
        <View style={{ height: 80, backgroundColor: "gray" }}></View>
        <NavigationContainer>
          <Tab.Navigator screenOptions={tabOption}>
            <Tab.Screen
              name="①"
              component={Calculator}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="②"
              component={Calculator}
              options={{ headerShown: false }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </View>
  );
};

const tabOption = {
  tabBarLabelStyle: {
    fontWeight: "700",
    fontSize: 40,
    marginBottom: 4,
  },
  tabBarIconStyle: { display: "none" },
  tabBarActiveTintColor: "black",
  tabBarActiveBackgroundColor: "white",
  tabBarInactiveTintColor: "white",
  tabBarInactiveBackgroundColor: "gray",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 30,
  },
  hide: {
    display: "none",
  },
});

export default App;
