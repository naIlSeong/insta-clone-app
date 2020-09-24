import React from "react";
import { Image } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.View``;
const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px;
`;

const Touchable = styled.TouchableOpacity``;
const Bold = styled.Text`
  font-weight: 500;
  font-size: 14px;
  margin-left: 2px;
`;

const Location = styled.Text`
  font-weight: 300;
  font-size: 12px;
`;

const Post = ({ user, location }) => {
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
