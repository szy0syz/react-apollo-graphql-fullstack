import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth';

/**
 * @description: 如果用户已登录，则不再渲染路由对应组件。实例：登录用户访问注册页则返回首页
 * @param {type} 
 * @return: 
 */
function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props => user ? <Redirect to="/" /> : <Component {...props} />}
    />
  )
}

export default AuthRoute;