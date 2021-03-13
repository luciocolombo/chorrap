import React, {useState, useRef, useMemo, useCallback} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
function DraggableMarker({savePosition}) {

    
    const center = {
        lat: -32.959676,
        lng: -60.661406,
      }
        const [draggable, setDraggable] = useState(true)
        const [position, setPosition] = useState(center)
        const markerRef = useRef(center)
        const eventHandlers = useMemo(
          () => ({
            dragend() {
              const marker = markerRef.current
              if (marker != null) {
                setPosition(marker.getLatLng())
              }
            },
          }),
          [],
        )
        const toggleDraggable = useCallback(() => {
          setDraggable((d) => !d)
        }, [])

        useState((
          savePosition(position)
          ),[DraggableMarker])
          
        return (
          <div>
          <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}>
            <Popup minWidth={90}>
              <span onClick={toggleDraggable}>
                {draggable
                  ? 'Marker is draggable'
                  : 'Click here to make marker draggable'}
              </span>
            </Popup>
          </Marker>
          
          </div>
         
        )

}
export default DraggableMarker
