/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 09:22:31
 * @LastEditTime: 2019-09-16 09:22:31
 * @LastEditors: your name
 */
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { AuthProvider } from './context/auth';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
