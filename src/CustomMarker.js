import React from 'react'
import { Marker, Popup } from 'react-leaflet'

//this is a marker which accept text easily
function CustomMarker({position,popUpText, hoverText}) {
    return (
        <div>
        <Marker position={position} title={hoverText}>
          <Popup>
            
            {popUpText}
          </Popup>
        </Marker>
        </div>
    )
}

export default CustomMarker


