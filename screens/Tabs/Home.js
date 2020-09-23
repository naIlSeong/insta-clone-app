import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import Loader from "../../components/Loader";

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      caption
      location
      user {
        id
        username
        avatar
      }
      files {
        id
        url
      }
      comments {
        id
        text
        user {
          id
          username
        }
      }
      isLike
      likeCount
      createdAt
    }
  }
`;

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

export default () => {
  const { loading, data } = useQuery(FEED_QUERY);
  console.log(loading, data);

  return <View>{loading ? <Loader /> : null}</View>;
};
