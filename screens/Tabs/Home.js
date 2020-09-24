import React, { useState } from "react";
import { Alert, RefreshControl, ScrollView } from "react-native";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

import Loader from "../../components/Loader";
import Post from "../../components/Post";

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

export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(FEED_QUERY);
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (error) {
      Alert.alert("Can't refresh");
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.seeFeed &&
        data.seeFeed.map((post) => <Post key={post.id} {...post} />)
      )}
    </ScrollView>
  );
};
