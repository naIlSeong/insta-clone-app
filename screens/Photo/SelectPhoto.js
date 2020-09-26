import React, { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import styled from "styled-components";
import Loader from "../../components/Loader";
import { Image } from "react-native";
import { screenWidth } from "../../constants";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import styles from "../../styles";

const View = styled.View`
  flex: 1;
`;

const Button = styled.TouchableOpacity`
  position: absolute;
  background-color: ${styles.darkGreyColor};
  width: 80px;
  height: 30px;
  justify-content: center;
  align-items: center;
  right: 10px;
  top: 10px;
  border-radius: 10px;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selected, setSelected] = useState();
  const [allPhotos, setAllPhotos] = useState();

  const handleSelected = () => {
    navigation.navigate("UploadPhoto", { photo: selected });
  };

  const changeSelected = (photo) => {
    setSelected(photo);
  };

  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync();
      const [firstPhoto] = assets;
      setSelected(firstPhoto);
      setAllPhotos(assets);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        setHasPermission(true);
        getPhotos();
      }
    } catch (error) {
      setHasPermission(false);
    }
  };
  useEffect(() => {
    askPermission();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          {hasPermission ? (
            <>
              <Image
                source={{ uri: selected.uri }}
                style={{ width: screenWidth, height: screenWidth }}
              />

              <Button onPress={handleSelected}>
                <Text>Upload</Text>
              </Button>

              <ScrollView
                contentContainerStyle={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {allPhotos.map((photo) => (
                  <TouchableOpacity
                    key={photo.id}
                    onPress={() => changeSelected(photo)}
                  >
                    <Image
                      source={{ uri: photo.uri }}
                      style={{
                        width: screenWidth / 3,
                        height: screenWidth / 3,
                        opacity: photo.id === selected.id ? 0.5 : 1,
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          ) : null}
        </View>
      )}
    </View>
  );
};
