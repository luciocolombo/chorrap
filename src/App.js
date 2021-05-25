import React from 'react'
import './App.css';

import {BrowserRouter as Router, Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import InputBar from "./InputBar"
import MapAllDogs from "./MapAllDogs"
import Login from "./Login"
import Register from "./Register"
/* import { Tabs, Tab, Sonet } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom"; */
 
function App() {


return(
   
    <Router>
      <Route path="/" exact>
       
       {localStorage.getItem("state")==="logged"?
        <div className="App">
          <InputBar/>
        </div>
        :<h1>Auth first</h1> //redirect to login
       }

      </Route> 
          
      <Route path="/all" exact>
        <MapAllDogs />
      </Route>

      <Route path="/login" exact>
        <Login/>
      </Route>

      <Route path="/register" exact>
        <Register/>
      </Route>
    </Router>

)
}
export default App;
