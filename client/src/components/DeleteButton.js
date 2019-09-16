import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, Icon } from 'semantic-ui-react';

function DeleteButton(props) {
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: { postId },
  });

  return (
    <Button as='div' color='red' floated='right' onClick={() => console.log('Delete Post')}>
      <Icon name='trash' style={{ margin: 0 }} />
    </Button>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletaPost($postId: ID!) {
    deletePost($postId: postId)
  }
`;

export default DeleteButton;
