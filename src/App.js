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

function AuthRoute(MyComponent) {
  console.log('Render de la ruta');
  const state = localStorage.getItem('state');
  if (state === 'logged') {
    return <MyComponent />;
  }
  return <Redirect to="/login" />;
}

function App() {
  console.log('Render del router');
  //
  return (
    <Router>
      <Route path="/" exact>
        <LandingPage />
      </Route>
      <Route exact path="/reportar" render={() => AuthRoute(InputBar)} />
      <Route path="/all" exact render={() => AuthRoute(DogFiltering)} />

      <Route path="/login" exact>
        <Login />
      </Route>

      <Route path="/register" exact>
        <Register />
      </Route>
      <Route path="/reported" exact render={() => AuthRoute(Reported)} />
    </Router>
  );
}
export default App;
