import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";

import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { CONFIRM_SECRET } from "./AuthQueries";
import { useLogIn } from "../../AuthContext";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default ({ route }) => {
  const navigation = useNavigation();
  const { email } = route.params;
  const confirmInput = useInput("");
  const logIn = useLogIn();
  const [loading, setLoading] = useState(false);
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      secret: confirmInput.value,
      email,
    },
  });

  const handleConfirm = async () => {
    const { value } = confirmInput;
    if (value === "" || !value.includes(" ")) {
      return Alert.alert("Invalid secret");
    }
    try {
      setLoading(true);
      const {
        data: { confirmSecret },
      } = await confirmSecretMutation();
      if (confirmSecret !== "") {
        logIn(confirmSecret);
      } else {
        Alert.alert("Wrong secret");
      }
    } catch (error) {
      Alert.alert("Can't confirm secret");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...confirmInput}
          placeholder="Secret"
          returnKeyType="send"
          onSubmitEditing={handleConfirm}
        />
        <AuthButton loading={loading} text="Confirm" onPress={handleConfirm} />
      </View>
    </TouchableWithoutFeedback>
  );
};
