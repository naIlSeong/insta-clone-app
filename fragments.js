import { gql } from "apollo-boost";

export const POST_FRAGMENT = gql`
  fragment PostParts on Post {
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
`;
