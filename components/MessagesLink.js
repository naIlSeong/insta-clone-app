import React from "react";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
import NavIcon from "./NavIcon";

const Container = styled.TouchableOpacity`
  padding-right: 14px;
`;

export default () => {
  const navigation = useNavigation();

  return (
    <Container onPress={() => navigation.navigate("MessageNavigation")}>
      <NavIcon
        focused={true}
        name={Platform.OS === "ios" ? "ios-paper-plane" : "md-paper-plane"}
      />
    </Container>
  );
};
