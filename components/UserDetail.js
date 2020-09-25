import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import Loader from "../components/Loader";
import { USER_FRAGMENT } from "../fragments";
import UserProfile from "./UserProfile";

const GET_USER = gql`
  query seeProfile($id: String!) {
    seeProfile(id: $id) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default ({ route }) => {
  const { loading, data } = useQuery(GET_USER, {
    variables: { id: route.params.id },
  });

  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data && data.seeProfile && <UserProfile {...data.seeProfile} />
      )}
    </ScrollView>
  );
};
