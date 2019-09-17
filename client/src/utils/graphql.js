import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likes {
        username
      }
      likeCount
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;