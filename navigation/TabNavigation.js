import React from "react";
import { View, Image, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Tabs/Home";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import Search from "../screens/Tabs/Search";
import Detail from "../screens/Detail";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NavIcon";
import UserDetail from "../components/UserDetail";
import { navigationStyles } from "./config";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const stackFactory = (initialRoute, name, customConfig) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={initialRoute}
        name={name}
        options={{
          ...customConfig,
          headerStyle: { ...navigationStyles },
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          ...customConfig,
          headerStyle: { ...navigationStyles },
          headerTintColor: styles.blackColor,
          headerTitle: "Photo",
        }}
      />
      <Stack.Screen
        name="UserDetail"
        component={UserDetail}
        options={{
          ...customConfig,
          headerStyle: { ...navigationStyles },
          headerTintColor: styles.blackColor,
          headerTitle: "User",
          headerBackTitle: " ",
        }}
      />
    </Stack.Navigator>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: { ...navigationStyles },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={Platform.OS === "ios" ? "ios-home" : "md-home"}
            />
          ),
        }}
      >
        {() =>
          stackFactory(Home, "Home", {
            headerRight: () => <MessagesLink />,
            headerTitle: (
              <Image source={require("../assets/instagramLogo.png")} />
            ),
          })
        }
      </Tab.Screen>

      <Tab.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={Platform.OS === "ios" ? "ios-search" : "md-search"}
            />
          ),
        }}
      >
        {() =>
          stackFactory(Search, "Search", {
            headerTitle: " ",
            headerBackTitle: " ",
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
        options={{
          tabBarIcon: () => (
            <NavIcon
              name={
                Platform.OS === "ios"
                  ? "ios-add-circle-outline"
                  : "md-add-circle-outline"
              }
            />
          ),
        }}
      />

      <Tab.Screen
        name="Notifications"
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={
                Platform.OS === "ios"
                  ? focused
                    ? "ios-heart"
                    : "ios-heart-empty"
                  : focused
                  ? "md-heart"
                  : "md-heart-empty"
              }
            />
          ),
        }}
      >
        {() =>
          stackFactory(Notifications, "Notifications", {
            title: "Notifications",
          })
        }
      </Tab.Screen>

      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={Platform.OS === "ios" ? "ios-person" : "md-person"}
            />
          ),
        }}
      >
        {() =>
          stackFactory(Profile, "Profile", {
            title: "Profile",
          })
        }
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigation;
