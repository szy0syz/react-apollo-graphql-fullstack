<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 09:22:31
 * @LastEditTime: 2019-09-20 23:55:54
 * @LastEditors: Please set LastEditors
 -->

# React-Apollo-Graphql-Fullstack

> apollo-server

## 学到什么

- mongoose 和 server 链式调用
- apollo-server 基本使用
- 原来 mongoose 查出来的对象可以调用 user.\_id 就是一个 lean()过以后的纯净对象

## 步骤

- 建立 graphql 文件夹

```bash
yarn add @apollo/react-hooks apollo-cache-inmemory apollo-link-http apollo-client
```

## Clien

### No.1 初始化 Apollo

- 创建 AolloProvder.js

```js
import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

const httpLink = createHttpLink({
  uri: 'http://localhost:5100',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
```

- 修改 index.js，使用 Apollo 的 Provider 包裹一层 App.js

```js
import ApolloProvider from './ApolloProvider';

ReactDOM.render(ApolloProvider, document.getElementById('root'));
```

### No.2 初始化 Router 和 Semantic

> yarn add eact-router-dom semantic-ui-css semantic-ui-react

- 在 graphql 的 schema 中使用 Date 类型，否则只有 String
- `https://www.apollographql.com/docs/graphql-tools/scalars/`

```js
module.exports = gql`
  scalar Date

  type Post {
    id: ID!
    body: String!
    createdAt: Date!
    username: String!
  }
}
```

### 封装 useForm

> 封装以后就可以在登录和注册，或者以后其他表单页面使用。 hook 真香

```js
import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
```

### 更新 Apollo-GraphQL 缓存

```js
const [deletePost] = useMutation(DELETE_POST_MUTATION, {
  update(proxy) {
    setConfirmOpen(false);
    // * remove post from cache
    // ! 读缓存 过滤缓存 写缓存
    const data = proxy.readQuery({
      query: FETCH_POSTS_QUERY,
    });
    data.getPosts = data.getPosts.filter(p => p.id !== postId);
    proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
    if (callback) callback();
  },
  variables: {
    postId,
  },
});
```

### 关于更新 Apollo cache 缓存问题

> 在 "@apollo/react-hooks": "^3.0.0" 之前，上述方法能触发组件重渲染，但到 3.0+ 以后则不会再触发，得这么改！！！

```js
// ApolloProvider.js 里
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ freezeResults: true }),  // new
  assumeImmutableResults: true,  // new
});

update() {
  // ...
  const newPosts = [result.data.createPost, ...data.getPosts];
  proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts: newPosts } });
}
```
