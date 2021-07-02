/* import React from 'react'; */
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputBar from './InputBar';
import DogFiltering from './DogFiltering';
import Login from './Login';
import Register from './Register';
import Reported from './Reported';
import Reset from './Reset';
import UserPage from './UserPage';
/* import LandingPage from './LandingPage'; */

/* import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom'; */
import { I18nextProvider } from 'react-i18next';
import 'antd/dist/antd.css';

import Routerr from './router';
import i18n from './translation';

function AuthRoute(MyComponent) {
  /*   console.log('Render de la ruta'); */
  const state = localStorage.getItem('state');
  if (state === 'logged') {
    return <MyComponent />;
  }
  return <Redirect to="/login" />;
}

function App() {
  /*   console.log('Render del router'); */
  //
  return (
    <Router>
      <Route path="/" exact>
        {/*  <LandingPage /> */}
        <I18nextProvider i18n={i18n}>
          <Routerr />
        </I18nextProvider>
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
      <Route path="/reset/">
        <Reset />
      </Route>
      <Route path="/user" exact render={() => AuthRoute(UserPage)} />
    </Router>
  );
}
export default App;

/* import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import "antd/dist/antd.css";

import Router from "./router";
import i18n from "./translation";

const App = () => (
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <Router />
    </I18nextProvider>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));
 */
