import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Easing } from "react-native";
import Calculator from "./CalculatorScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <View style={styles.container}>
      <View style={{ height: 80 }}></View>
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
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={toggleCalclator}>
          <Text style={{ fontSize: 30 }}> {showFirst ? "電卓①" : "電卓②"}</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.container, showFirst ? null : styles.hide]}>
        <Calculator showFlg={true} />
      </View>
      <View style={[styles.container, showFirst ? styles.hide : null]}>
        <Calculator showFlg={true} />
      </View> */}
    </View>
  );
};

const tabOption = {
  // tabBarIcon: () => {
  //   null;
  // },
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
