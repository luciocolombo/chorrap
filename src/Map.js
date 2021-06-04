import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import DraggableMarker from './DraggableMarker';

function Map({ setPosition }) {
  function DraggableMarkerPosition(position) {
    setPosition(position);
  }

  const position = [-32.959676, -60.661406];

  return (
    <div>
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

        <DraggableMarker savePosition={DraggableMarkerPosition} />
      </MapContainer>
    </div>
  );
}

export default Map;
