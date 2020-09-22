import { View } from "react-native";

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Tabs/Home";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import Search from "../screens/Tabs/Search";
import MessagesLink from "../components/MessagesLink";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const stackFactory = (initialRoute, name, customConfig) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={initialRoute}
        name={name}
        options={{ ...customConfig }}
      />
    </Stack.Navigator>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home">
        {() =>
          stackFactory(Home, "Home", {
            headerTitle: "Home",
            headerRight: () => <MessagesLink />,
          })
        }
      </Tab.Screen>
      <Tab.Screen name="Notifications">
        {() =>
          stackFactory(Notifications, "Notifications", {
            title: "Notifications",
          })
        }
      </Tab.Screen>
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
      <Tab.Screen name="Profile">
        {() =>
          stackFactory(Profile, "Profile", {
            title: "Profile",
          })
        }
      </Tab.Screen>
      <Tab.Screen name="Search">
        {() =>
          stackFactory(Search, "Search", {
            title: "Search",
          })
        }
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigation;
