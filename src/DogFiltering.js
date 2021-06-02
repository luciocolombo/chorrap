import { React, useState } from 'react';
import { Form } from 'react-bootstrap';
import MapAllDogs from './MapAllDogs';
import UserBar from './UserBar';

function DogFiltering() {
  const [blackColor, toggleBlackColor] = useState(false);
  const [whiteColor, toggleWhiteColor] = useState(false);
  const [brownColor, toggleBrownColor] = useState(false);
  const [blondeColor, toggleBlondeColor] = useState(false);
  const [redColor, toggleRedColor] = useState(false);

  return (
    <div>
      <UserBar seeAllDogs="disabled" />
      <div className="container bg-white border shadow">
        <Form.Group controlId="formBasicCheckbox">
          <h2>Seleccione colores de perro para filtrar (simultáneos)</h2>
          <Form.Check
            type="checkbox"
            label="Negro"
            value={blackColor}
            onChange={(e) => toggleBlackColor(e.target.checked)}
          />
          <Form.Check
            type="checkbox"
            label="Blanco"
            value={whiteColor}
            onChange={(e) => toggleWhiteColor(e.target.checked)}
          />
          <Form.Check
            type="checkbox"
            label="Marron"
            value={brownColor}
            onChange={(e) => toggleBrownColor(e.target.checked)}
          />
          <Form.Check
            type="checkbox"
            label="Rubio"
            value={blondeColor}
            onChange={(e) => toggleBlondeColor(e.target.checked)}
          />
          <Form.Check
            type="checkbox"
            label="Colorado"
            value={redColor}
            onChange={(e) => toggleRedColor(e.target.checked)}
          />
        </Form.Group>

        <MapAllDogs
          black={blackColor}
          white={whiteColor}
          red={redColor}
          blonde={blondeColor}
          brown={brownColor}
        />
      </div>
    </div>
  );
}

export default DogFiltering;
