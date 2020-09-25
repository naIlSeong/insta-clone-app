import React, { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import styled from "styled-components";
import Loader from "../../components/Loader";
import { Image } from "react-native";
import { screenWidth } from "../../constants";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const View = styled.View`
  flex: 1;
`;

export default () => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selected, setSelected] = useState();
  const [allPhotos, setAllPhotos] = useState();

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
              <ScrollView contentContainerStyle={{ flexDirection: "row" }}>
                {allPhotos.map((photo) => (
                  <TouchableOpacity onPress={() => changeSelected(photo)}>
                    <Image
                      key={photo.id}
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
