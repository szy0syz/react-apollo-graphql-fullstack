/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 09:22:31
 * @LastEditTime: 2019-09-16 09:22:31
 * @LastEditors: your name
 */
import React, { useState, useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  // /login
  const path = pathname === '/' ? 'home' : pathname.substr(1);

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (_, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name={user.username}
        active
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="logout"
          onClick={logout}
        />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          position="right"
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          position="right"
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
}

export default MenuBar;
