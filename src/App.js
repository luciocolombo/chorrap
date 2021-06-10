import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputBar from './InputBar';
import DogFiltering from './DogFiltering';
import Login from './Login';
import Register from './Register';
import Reported from './Reported';
import LandingPage from './LandingPage';

function App() {
  return (
    <Router>
      <Route path="/" exact>
        <LandingPage />
      </Route>
      <Route path="/reportar" exact>
        {localStorage.getItem('state') === 'logged' ? (
          <InputBar />
        ) : (
          <Redirect to="/login" />
        )}
      </Route>

      <Route path="/all" exact>
        {localStorage.getItem('state') === 'logged' ? (
          <DogFiltering />
        ) : (
          <Redirect to="/login" />
        )}
      </Route>

      <Route path="/login" exact>
        <Login />
      </Route>

      <Route path="/register" exact>
        <Register />
      </Route>

      <Route path="/reported" exact>
        {localStorage.getItem('state') === 'logged' ? (
          <Reported />
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
    </Router>
  );
}
export default App;
