import React, {useState} from 'react'
import './App.css';
import { Button } from 'react-bootstrap';
import Map from './Map'
import 'bootstrap/dist/css/bootstrap.min.css';
import InputBar from "./InputBar"
/* import { Tabs, Tab, Sonet } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom"; */
 
function App() {

    const [draggableVisibility, toggleDraggableVisibility]=useState(false)

return(

  <div className="App">
   
    <InputBar/>
    <Button className="btn btn-info ml-3 mb-1" onClick={()=>{toggleDraggableVisibility(!draggableVisibility)}}>Toggle draggable marker visibility (and show all lost dogs)</Button>
    <Map showDraggable={draggableVisibility}/>
  </div>
)
}
export default App;
