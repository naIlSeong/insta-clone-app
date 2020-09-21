import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useIsLoggedIn } from "../AuthContext";
import AuthNavigation from "../navigation/AuthNavigation";
import TabNavigation from "../navigation/TabNavigation";

export default () => {
  const isLoggedIn = true; /* useIsLoggedIn() */
  return (
    <View style={{ flex: 1 }}>
      {isLoggedIn ? <TabNavigation /> : <AuthNavigation />}
    </View>
  );
};
