import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components";

const View = styled.View``;
const Text = styled.Text``;

export default ({ route }) => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Id : {route.params.id} </Text>
    </View>
  );
};
