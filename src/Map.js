import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import DraggableMarker from './DraggableMarker';

function Map({ setPosition }) {
  /* const [draggablePosition, setDraggablePosition] = useState(''); */

  function DraggableMarkerPosition(position) {
    /*  setDraggablePosition(position); */
    /*   console.log("posicion actual draggableposition", draggablePosition) */
    setPosition(position);
  }

  /* function sendDraggableToDb(){
        console.log("Send draggable to db")
         const crimePosition=draggablePosition
        axios.post("http://localhost:4000/postcrime",crimePosition)
         .then(console.log("ENVIADO ")
        ) 
    } */
  const position = [-32.959676, -60.661406];

  return (
    <div>
      {/*  {showDraggable?
            <Button className="btn btn-info ml-3" onClick={sendDraggableToDb}>Enviar perro perdido a DB</Button>:
            <Button className="btn btn-info ml-3" disabled>Enviar perro perdido a DB</Button>} */}

      <MapContainer
        className="mapcontainer"
        center={position}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/*    <CustomMarker position={position} text="Custom crime info"/> */}

        {/* {showDraggable?
                    (<div className="btns"> */}
        <DraggableMarker savePosition={DraggableMarkerPosition} />
        {/*      </div>
                        ):
                    (console.log("draggable visibility off"))
                } */}
      </MapContainer>
    </div>
  );
}

export default Map;
