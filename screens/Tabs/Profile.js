import React from "react";
import { gql } from "apollo-boost";
import styled from "styled-components";
import { USER_FRAGMENT } from "../../fragments";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../components/Loader";
import UserProfile from "../../components/UserProfile";

const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default () => {
  const { loading, data } = useQuery(ME);

  return (
    <ScrollView>
      {loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />}
    </ScrollView>
  );
};
