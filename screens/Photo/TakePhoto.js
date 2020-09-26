import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components";
import Loader from "../../components/Loader";
import { screenWidth } from "../../constants";
import { Platform } from "react-native";
import styles from "../../styles";

const View = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Button = styled.View`
  width: 80px;
  height: 80px;
  margin-top: 30px;
  border-radius: 50px;
  border: 14px solid ${styles.lightGreyColor};
`;

export default ({ navigation }) => {
  const cameraRef = useRef();
  const [canTakePhoto, setCanTakePhoto] = useState(true);
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const takePhoto = async () => {
    if (!canTakePhoto) {
      return;
    }
    try {
      setCanTakePhoto(false);
      const { uri } = await cameraRef.current.takePictureAsync({
        quality: 1,
      });
      const asset = await MediaLibrary.createAssetAsync(uri);
      navigation.navigate("UploadPhoto", { photo: asset });
    } catch (error) {
      setCanTakePhoto(false);
    }
  };

  const changeCameraType = () => {
    if (cameraType === Camera.Constants.Type.back) {
      setCameraType(Camera.Constants.Type.front);
    } else setCameraType(Camera.Constants.Type.back);
  };

  const askPermission = async () => {
    try {
      const { status } = await Camera.requestPermissionsAsync();
      if (status === "granted") {
        setHasPermission(true);
        setLoading(false);
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
      ) : hasPermission ? (
        <>
          <Camera
            ref={cameraRef}
            style={{
              width: screenWidth,
              height: screenWidth,
              justifyContent: "flex-end",
              padding: 16,
            }}
            type={cameraType}
          >
            <TouchableOpacity onPress={changeCameraType}>
              <Ionicons
                name={Platform.OS === "ios" ? "ios-sync" : "md-sync"}
                size={36}
                color={"white"}
              />
            </TouchableOpacity>
          </Camera>
          <View>
            <TouchableOpacity onPress={takePhoto} disabled={!canTakePhoto}>
              <Button />
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </View>
  );
};
