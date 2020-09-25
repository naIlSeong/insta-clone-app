import React, { useState } from "react";
import { Alert, RefreshControl, ScrollView } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

const SEARCH = gql`
  query searchPost($term: String!) {
    searchPost(term: $term) {
      id
      files {
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
    />
  );
};

SearchPresenter.propTypes = {
  term: PropTypes.string,
  shouldFetch: PropTypes.bool.isRequired,
};

export default SearchPresenter;
