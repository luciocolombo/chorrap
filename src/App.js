import React, {useState} from 'react'
import './App.css';
import Map from './Map'
import { Tabs, Tab, Sonet } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'/* 
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
 */
function App() {

    const [draggableVisibility, toggleDraggableVisibility]=useState(false)

return(

  <div>
    
    <button onClick={()=>{toggleDraggableVisibility(!draggableVisibility)}}>Toggle draggable marker visibility</button>
    <Map showDraggable={draggableVisibility}/>
  </div>
)
}
export default App;
