import React from "react";
import styled from "styled-components";
import { screenWidth, screenHeight } from "../../constants";
import AuthButton from "../../components/AuthButton";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  width: ${screenWidth}px;
  height: ${screenHeight / 18}px;
  margin-bottom: 30px;
`;

const Touchable = styled.TouchableOpacity``;

const LoginLink = styled.View``;
const LoginLinkText = styled.Text`
  color: ${(props) => props.theme.blueColor};
  font-weight: 600;
  margin-top: 20px;
`;

export default ({ navigation }) => (
  <View>
    <Image
      resizeMode={"contain"}
      source={require("../../assets/instagramLogo.png")}
    />
    <AuthButton
      text={"Create New Account"}
      onPress={() => navigation.navigate("Signup")}
    />
    <Touchable onPress={() => navigation.navigate("Login")}>
      <LoginLink>
        <LoginLinkText>Log In</LoginLinkText>
      </LoginLink>
    </Touchable>
  </View>
);
