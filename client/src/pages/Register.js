/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 09:22:31
 * @LastEditTime: 2019-09-16 10:19:22
 * @LastEditors: Please set LastEditors
 */
import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { useForm } from '../utils/hooks';

function Register(props) {
  const [errors, setErrors] = useState({});

  // const initialState = {
  //   username: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: '',
  // };

  // const [values, setValues] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: '',
  // });

  // const onChange = event => {
  //   setValues({ ...values, [event.target.name]: event.target.value });
  // };

  // const onSubmit = event => {
  //   event.preventDefault();
  //   addUser();
  // };

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [addUser, { loading }] = useMutation(REGISGER_USER, {
    /**
     * @description: 当执行副作用函数返回成功时
     * @param {proxy, result: model.User} 
     * @return: void()
     */    
    update() {
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });


  /**
   * @description: 为了消除 Warning
   * @param {type} 
   * @return: 
   */  
  function registerUser() {
    addUser();
  }
  
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          type="text"
          error={errors.name ? true : false}
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email..."
          name="email"
          type="email"
          error={errors.email ? true : false}
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          error={errors.password ? true : false}
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          type="password"
          error={errors.confirmPassword ? true : false}
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit">Register</Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const REGISGER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
