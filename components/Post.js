import React from "react";
import { Image } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";

import { screenWidth } from "../constants";

const Container = styled.View``;
const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 8px;
`;

const Touchable = styled.TouchableOpacity``;
const Bold = styled.Text`
  font-weight: 500;
  font-size: 14px;
`;

const Location = styled.Text`
  font-weight: 300;
  font-size: 12px;
`;

const IconsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
`;

const IconContainer = styled.View`
  margin-right: 12px;
`;

const InfoContainer = styled.View`
  padding: 12px;
`;

const Caption = styled.Text`
  margin: 4px 0;
`;

const CommentsCount = styled.Text`
  opacity: 0.5;
  font-size: 12px;
`;

const Post = ({
  user,
  location,
  files = [],
  likeCount,
  caption,
  comments = [],
}) => {
  return (
    <Container>
      <Header>
        <Touchable>
          <Image
            style={{ width: 30, height: 30, borderRadius: 15, marginRight: 8 }}
            source={{ uri: user.avatar }}
          />
        </Touchable>
        <Touchable>
          <Bold>{user.username}</Bold>
          {location ? <Location>{location}</Location> : null}
        </Touchable>
      </Header>
      <Swiper height={screenWidth} loop={false}>
        {files.map((photo) => (
          <Image
            key={photo.id}
            style={{
              width: screenWidth,
              height: screenWidth,
            }}
            source={{ uri: photo.url }}
          />
        ))}
      </Swiper>
      <InfoContainer>
        <IconsContainer>
          <Touchable>
            <IconContainer>
              <Ionicons
                name={
                  Platform.OS === "ios" ? "ios-heart-empty" : "md-heart-empty"
                }
                size={30}
              />
            </IconContainer>
          </Touchable>
          <Touchable>
            <IconContainer>
              <Ionicons
                name={Platform.OS === "ios" ? "ios-text" : "md-text"}
                size={30}
              />
            </IconContainer>
          </Touchable>
        </IconsContainer>
        <Touchable>
          <Bold>
            {likeCount === 1 ? ` ${likeCount} like` : `${likeCount} likes`}
          </Bold>
        </Touchable>
        <Caption>
          <Bold>{user.username}</Bold> {caption}
        </Caption>
        <Touchable>
          <CommentsCount>See all {comments.length} comments</CommentsCount>
        </Touchable>
      </InfoContainer>
    </Container>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  isLike: PropTypes.bool.isRequired,
  likeCount: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default Post;
