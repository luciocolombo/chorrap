import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputBar from './InputBar';
import DogFiltering from './DogFiltering';
import Login from './Login';
import Register from './Register';
import Reported from './Reported';
import LandingPage from './LandingPage';
/* import { Tabs, Tab, Sonet } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom"; */

function App() {
  return (
    <Router>
      <Route path="/" exact>
        <LandingPage />
      </Route>
      <Route path="/reportar" exact>
        {localStorage.getItem('state', 'logged') ? (
          <InputBar />
        ) : (
          <h3>Forbidden</h3>
        )}
      </Route>

      <Route path="/all" exact>
        {localStorage.getItem('state', 'logged') ? (
          <DogFiltering />
        ) : (
          <h3>Forbidden</h3>
        )}
      </Route>

      <Route path="/login" exact>
        <Login />
      </Route>

      <Route path="/register" exact>
        <Register />
      </Route>

      <Route path="/reported" exact>
        {localStorage.getItem('state', 'logged') ? (
          <Reported />
        ) : (
          <h3>Forbidden</h3>
        )}
      </Route>
    </Router>
  );
}
export default App;
