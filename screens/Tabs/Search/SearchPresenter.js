import React, { useState } from "react";
import { Alert, RefreshControl, ScrollView } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

import Loader from "../../../components/Loader";
import SquarePhoto from "../../../components/SquarePhoto";

const SEARCH = gql`
  query searchPost($term: String!) {
    searchPost(term: $term) {
      id
      files {
        id
        url
      }
    }
  }
`;

const SearchPresenter = ({ term, shouldFetch }) => {
  const [refresing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(SEARCH, {
    variables: {
      term,
    },
    skip: !shouldFetch,
    fetchPolicy: "network-only",
  });

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch({ term });
    } catch (error) {
      Alert.alert("Can't search now");
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refresing} />
      }
      contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
    >
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.searchPost &&
        data.searchPost.map((post) => <SquarePhoto key={post.id} {...post} />)
      )}
    </ScrollView>
  );
};

SearchPresenter.propTypes = {
  term: PropTypes.string.isRequired,
  shouldFetch: PropTypes.bool.isRequired,
};

export default SearchPresenter;
