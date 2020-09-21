import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

export default ({ navigation }) => (
  <View>
    <Text>AuthHome</Text>
    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
      <Text>Go to Log In</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
      <Text>Go to Sign Up</Text>
    </TouchableOpacity>
  </View>
);
