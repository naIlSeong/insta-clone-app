import React, { useState } from "react";
import { ActivityIndicator, Alert, Image } from "react-native";
import styled from "styled-components";
import { screenWidth } from "../../constants";
import useInput from "../../hooks/useInput";
import styles from "../../styles";

const View = styled.View`
  flex: 1;
`;

const Container = styled.View`
  padding: 16px;
  flex-direction: row;
`;

const Form = styled.View`
  margin-left: 20px;
`;

const STextInput = styled.TextInput`
  width: ${screenWidth - 160}px;
  border: 0px solid ${styles.lightGreyColor};
  border-bottom-width: 1px;
  padding-bottom: 10px;
  margin: 10px 0;
`;

const ButtonContainer = styled.View`
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  background-color: ${styles.blueColor};
  width: 130px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  margin-top: 20px;
`;
const Text = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

export default ({ route }) => {
  const { photo } = route.params;
  const [loading, setLoading] = useState(false);
  const captionInput = useInput("");
  const locationInput = useInput("");

  const handleSubmit = async () => {
    if (captionInput.value === "" || locationInput.value === "") {
      Alert.alert("All fields are required");
    }
  };

  return (
    <View>
      <Container>
        <Image
          source={{ uri: photo.uri }}
          style={{ width: 100, height: 100 }}
        />
        <Form>
          <STextInput
            value={captionInput.value}
            placeholder={"Caption"}
            onChangeText={captionInput.onChange}
            placeholderTextColor={styles.darkGreyColor}
          />
          <STextInput
            value={locationInput.value}
            placeholder={"Location"}
            onChangeText={locationInput.onChange}
            placeholderTextColor={styles.darkGreyColor}
          />
        </Form>
      </Container>
      <ButtonContainer>
        <Button onPress={handleSubmit}>
          {loading ? <ActivityIndicator color="white" /> : <Text>Upload</Text>}
        </Button>
      </ButtonContainer>
    </View>
  );
};
