import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

//this is a marker which accept text easily
function CustomMarker({position,text}) {
    return (
        <div>
        <Marker position={position}>
          <Popup>
            {text}
          </Popup>
        </Marker>
        </div>
    )
}

export default CustomMarker
