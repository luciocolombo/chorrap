import React from 'react'
import { Marker, Popup } from 'react-leaflet'

//this is a marker which accept text easily
function CustomMarker({position,popUpText, hoverText}) {
    return (
        <div>
        <Marker position={position} title={hoverText}>
          <Popup>
            <img alt="foto perro" src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fhips.hearstapps.com%2Fhmg-prod.s3.amazonaws.com%2Fimages%2Fdog-puppy-on-garden-royalty-free-image-1586966191.jpg%3Fcrop%3D1.00xw%3A0.669xh%3B0%2C0.190xh%26resize%3D1200%3A%2A&sp=1617193781Tfd739d7b6694db5eed23f39f434f97404ff3af32ca42870c7683aef0be6820c5" width="200px" height="200px"></img>
            {popUpText}
          </Popup>
        </Marker>
        </div>
    )
}

export default CustomMarker


