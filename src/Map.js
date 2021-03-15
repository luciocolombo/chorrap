import React, {useState} from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
/* import CustomMarker from './CustomMarker' */
import DraggableMarker from './DraggableMarker'
/* import axios from "axios"; */
function Map({showDraggable}) {
    const [draggablePosition, setDraggablePosition]=useState("")
    function DraggableMarkerPosition(position){
        setDraggablePosition(position)
        console.log("posicion actual draggableposition", draggablePosition)
    }
    function sendDraggableToDb(){
        console.log("Send draggable to db")
       /*  const crimePosition=draggablePosition */
/*         axios.post("URL",crimePosition) */
    }
   const position = [-32.959676, -60.661406]
    return (
        <div>
            {showDraggable&&<button onClick={sendDraggableToDb}>Save marker position</button>}
            
        <MapContainer className="mapcontainer" center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
         {/*    <CustomMarker position={position} text="Custom crime info"/> */}
         
        {showDraggable?
          (<div className="btns">
              <DraggableMarker savePosition={DraggableMarkerPosition}/>
              
            </div>
             ):
          (console.log("draggable visibility off"))
         }

        
        </MapContainer>
        </div>
    )
}

export default Map
