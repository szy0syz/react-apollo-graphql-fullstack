import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../utils/hooks';

import { FETCH_POSTS_QUERY } from '../utils/graphql';

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: '',
  });

  // const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
  //   variables: values,
  //   update(proxy, result) {
  //     // 读取缓存结果
  //     const data = proxy.readQuery({
  //       query: FETCH_POSTS_QUERY,
  //     });
  //     // 将缓存结果和新post合并和写入缓存，graphQL真香！
  //     console.log('~~~~result.data.createPost', result.data.createPost);
  //     console.log('~~~~data.getPosts', data.getPosts);
  //     data.getPosts = [result.data.createPost, ...data.getPosts];
  //     proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });

  //     values.body = '';
  //   },
  // });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });

      const newPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts: newPosts } });
      values.body = '';
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi Jerry!"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
