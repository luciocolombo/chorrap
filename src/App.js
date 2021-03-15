import React, {useState} from 'react'
import './App.css';
import { Button } from 'react-bootstrap';
import Map from './Map'
import 'bootstrap/dist/css/bootstrap.min.css';
/* import { Tabs, Tab, Sonet } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom"; */
 
function App() {

    const [draggableVisibility, toggleDraggableVisibility]=useState(false)

return(

  <div className="App">
    <h1 className="hh1">Juntas contra el acoso callejero</h1>
    <Button className="btn btn-info" onClick={()=>{toggleDraggableVisibility(!draggableVisibility)}}>Toggle draggable marker visibility (and show all crimes)</Button>
    <Map showDraggable={draggableVisibility}/>
  </div>
)
}
export default App;
