import { View } from "react-native";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Notifications" component={Notifications} />
        <Tab.Screen name="Add" component={View} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Search" component={Search} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;
