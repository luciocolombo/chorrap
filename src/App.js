import React, {useState} from 'react'
import './App.css';
import { Button } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import InputBar from "./InputBar"
/* import { Tabs, Tab, Sonet } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom"; */
 
function App() {

   

return(

    <Router>
      <Route path="/" /* exact */>
        <div className="App">
          <InputBar/>
        </div>
      </Route>
    </Router>

)
}
export default App;
