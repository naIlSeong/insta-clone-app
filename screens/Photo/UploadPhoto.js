import React, { useState } from "react";
import { ActivityIndicator, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import axios from "axios";
import styled from "styled-components";

import useInput from "../../hooks/useInput";
import { screenWidth } from "../../constants";
import styles from "../../styles";
import { FEED_QUERY } from "../Tabs/Home";

const UPLOAD = gql`
  mutation upload($caption: String!, $location: String, $files: [String!]!) {
    upload(caption: $caption, location: $location, files: $files) {
      id
      caption
      location
      files {
        url
      }
    }
  }
`;

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
  const navigation = useNavigation();
  const { photo } = route.params;
  const [loading, setLoading] = useState(false);
  const captionInput = useInput("");
  const locationInput = useInput("");
  const [uploadMutatin] = useMutation(UPLOAD, {
    refetchQueries: () => [{ query: FEED_QUERY }],
  });

  const handleSubmit = async () => {
    if (captionInput.value === "" || locationInput.value === "") {
      Alert.alert("All fields are required");
    }
    const name = photo.filename;
    const [, type] = name.split(".");
    const formData = new FormData();
    formData.append("file", {
      name,
      type: type.toLowerCase(),
      uri: photo.uri,
    });
    try {
      setLoading(true);
      const {
        data: { location },
      } = await axios.post("http:localhost:8000/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      const {
        data: { upload },
      } = await uploadMutatin({
        variables: {
          files: [location],
          caption: captionInput.value,
          location: locationInput.value,
        },
      });
      if (upload.id) {
        navigation.navigate("Home");
      }
    } catch (error) {
      Alert.alert("Can't upload", "Try later");
    } finally {
      setLoading(false);
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
