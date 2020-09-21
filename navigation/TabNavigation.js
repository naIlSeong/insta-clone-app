import { View } from "react-native";

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen
        name="Add"
        component={View}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("PhotoNavigation");
          },
        })}
      />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
