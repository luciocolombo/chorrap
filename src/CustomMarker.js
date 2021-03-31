import React from 'react'
import { Marker, Popup } from 'react-leaflet'

//this is a marker which accept text easily
function CustomMarker({position,popUpText, hoverText}) {
    return (
        <div>
        <Marker position={position} onHover={hoverText}>
          <Popup>
            {popUpText}
          </Popup>
        </Marker>
        </div>
    )
}

export default CustomMarker


/* import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

const Example = (props) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div>
      <p>Somewhere in here is a <span style={{textDecoration: "underline", color:"blue"}} href="#" id="TooltipExample">tooltip</span>.</p>
      <Tooltip placement="right" isOpen={tooltipOpen} target="TooltipExample" toggle={toggle}>
        Hello world!
      </Tooltip>
    </div>
  );
}

export default Example; */