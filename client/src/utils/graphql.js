/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 11:59:08
 * @LastEditTime: 2019-09-16 12:02:51
 * @LastEditors: Please set LastEditors
 */
import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      commentCount
    }
  }
`;