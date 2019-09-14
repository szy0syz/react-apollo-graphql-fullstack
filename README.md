# React-Apollo-Graphql-Fullstack

> apollo-server

## 学到什么

* mongoose和server链式调用
* apollo-server基本使用
* 原来mongoose查出来的对象可以调用user._id就是一个lean()过以后的纯净对象

## 步骤

* 建立graphql文件夹

```bash
yarn add @apollo/react-hooks apollo-cache-inmemory apollo-link-http apollo-client
```

## Clien

### No.1 初始化Apollo

* 创建AolloProvder.js

```js
import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

const httpLink = createHttpLink({
  uri: 'http://localhost:5100'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
```

* 修改index.js，使用Apollo的Provider包裹一层App.js

```js
import ApolloProvider from './ApolloProvider';

ReactDOM.render(ApolloProvider, document.getElementById('root'));
```

### No.2 初始化Router和Semantic

> yarn add eact-router-dom semantic-ui-css semantic-ui-react

* 在graphql的schema中使用Date类型，否则只有String
* `https://www.apollographql.com/docs/graphql-tools/scalars/`

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
