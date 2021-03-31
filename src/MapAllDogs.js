import React, {useState} from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
/* import CustomMarker from './CustomMarker' */
import DraggableMarker from './DraggableMarker'
import { Button } from 'react-bootstrap';
import axios from "axios"
import CustomMarker from "./CustomMarker"


function MapAllDogs() {
    
   const position = [-32.959676, -60.661406]

   
    return (
        <div>
                           
            <MapContainer className="mapcontainer" center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                <CustomMarker position={position} hover="Hover text" popUpText="popup text"/>
                   
            </MapContainer>
        </div>
    )
}

export default MapAllDogs
