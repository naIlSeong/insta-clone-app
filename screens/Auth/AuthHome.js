import React from "react";
import styled from "styled-components";
import { screenWidth, screenHeight } from "../../constants";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  width: ${screenWidth};
  height: ${screenHeight / 18};
`;

const Touchable = styled.TouchableOpacity``;
const SignUpBtn = styled.View`
  background-color: ${(props) => props.theme.blueColor};
  padding: 6px;
  margin: 24px 0;
  width: ${screenWidth / 2};
  border-radius: 3px;
`;
const SignUpBtnText = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

const LoginLink = styled.View``;
const LoginLinkText = styled.Text`
  color: ${(props) => props.theme.blueColor};
  font-weight: 600;
`;

export default ({ navigation }) => (
  <View>
    <Image
      resizeMode={"contain"}
      source={require("../../assets/instagramLogo.png")}
    />
    <Touchable onPress={() => navigation.navigate("Signup")}>
      <SignUpBtn>
        <SignUpBtnText>Create New Account</SignUpBtnText>
      </SignUpBtn>
    </Touchable>
    <Touchable onPress={() => navigation.navigate("Login")}>
      <LoginLink>
        <LoginLinkText>Log In</LoginLinkText>
      </LoginLink>
    </Touchable>
  </View>
);
