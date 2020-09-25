import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { navigationStyles } from "./config";
import { Header } from "react-native/Libraries/NewAppScreen";
import styles from "../styles";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const PhotoTabs = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        style: { ...navigationStyles },
        indicatorStyle: { backgroundColor: null },
        labelStyle: { fontWeight: "600" },
      }}
    >
      <Tab.Screen name="Select" component={SelectPhoto} />
      <Tab.Screen name="Take" component={TakePhoto} />
    </Tab.Navigator>
  );
};

export default () => (
  <Stack.Navigator>
    <Stack.Screen
      name="PhotoTabs"
      component={PhotoTabs}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="UploadPhoto"
      component={UploadPhoto}
      options={{
        headerTitle: "",
        headerBackTitle: " ",
        headerTintColor: styles.blackColor,
        headerStyle: { backgroundColor: "#EFEEEF" },
      }}
    />
  </Stack.Navigator>
);
