import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";

import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { CREATE_ACCOUNT } from "./AuthQueries";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const FBConnect = styled.View`
  margin-top: 60px;
  padding-top: 30px;
  border-top-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.lightGreyColor};
  width: 80%;
  align-items: center;
`;

export default ({ route }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const firstNameInput = useInput("");
  const lastNameInput = useInput("");
  const emailInput = useInput("");
  const usernameInput = useInput("");

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      username: usernameInput.value,
      email: emailInput.value,
    },
  });

  const handleSignup = async () => {
    const { value: firstNameValue } = firstNameInput;
    const { value: emailValue } = emailInput;
    const { value: usernameValue } = usernameInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(emailValue)) {
      return Alert.alert("Invalid email");
    }
    if (firstNameValue === "") {
      return Alert.alert("Name is required");
    }
    if (usernameValue === "") {
      return Alert.alert("Invalid username");
    }
    try {
      setLoading(true);
      const {
        data: { createAccount },
      } = await createAccountMutation();
      if (createAccount) {
        Alert.alert("Account created", "Log in now!");
        navigation.navigate("Login", { email: emailInput.value });
      }
    } catch (error) {
      Alert.alert("This email is already in use");
      navigation.navigate("Login", { email: emailInput.value });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...firstNameInput}
          placeholder="First Name"
          autoCapitalize="words"
          autoCorrect={false}
        />
        <AuthInput
          {...lastNameInput}
          placeholder="Last Name"
          autoCapitalize="words"
          autoCorrect={false}
        />
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthInput
          {...usernameInput}
          placeholder="Username"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthButton loading={loading} text="Sign Up" onPress={handleSignup} />
        <FBConnect>
          <AuthButton
            loading={loading}
            text="Log in with Facebook"
            onPress={() => null}
            bgColor="#012577"
          />
        </FBConnect>
      </View>
    </TouchableWithoutFeedback>
  );
};
