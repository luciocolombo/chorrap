import { React, useState } from 'react';
import { Form } from 'react-bootstrap';
import MapAllDogs from './MapAllDogs';
import UserBar from './UserBar';
import Footer from './Footer';
import { Tooltip, OverlayTrigger, Badge } from 'react-bootstrap';
function DogFiltering() {
  const [blackColor, toggleBlackColor] = useState(false);
  const [whiteColor, toggleWhiteColor] = useState(false);
  const [brownColor, toggleBrownColor] = useState(false);
  const [blondeColor, toggleBlondeColor] = useState(false);
  const [redColor, toggleRedColor] = useState(false);
  const [sex, setSex] = useState('Macho');
  const [size, setSize] = useState('Mediano');
  /*   const [exactColors, setExactColors] = useState(false); */
  /*   const [estado, setEstado] = useState(''); */
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Conjunto incluyente (Un perro puede ser buscado por cualquiera de sus
      colores o suma de ellos)
    </Tooltip>
  );
  return (
    <div>
      <UserBar seeAllDogs="disabled" />
      <div className="container bg-white border shadow pl-4 pt-3">
        <h4>Seleccione características para encontrar su mascota</h4>
        <Form.Group controlId="formBasicCheckbox">
          <div className="row">
            <div className="col-4 px-5">
              <OverlayTrigger
                placement="right"
                delay={{ show: 50, hide: 300 }}
                overlay={renderTooltip}
              >
                <h6>
                  Colores{' '}
                  <Badge pill variant="secondary">
                    ?
                  </Badge>
                </h6>
              </OverlayTrigger>
              <Form.Check
                type="checkbox"
                label="Negro"
                value={blackColor}
                onChange={(e) => toggleBlackColor(e.target.checked)}
                id="Negro"
              />
              <Form.Check
                type="checkbox"
                label="Blanco"
                value={whiteColor}
                onChange={(e) => toggleWhiteColor(e.target.checked)}
                id="Blanco"
              />
              <Form.Check
                type="checkbox"
                label="Marron"
                value={brownColor}
                onChange={(e) => toggleBrownColor(e.target.checked)}
                id="Marron"
              />
              <Form.Check
                type="checkbox"
                label="Rubio"
                value={blondeColor}
                onChange={(e) => toggleBlondeColor(e.target.checked)}
                id="Rubio"
              />
              <Form.Check
                type="checkbox"
                label="Colorado"
                value={redColor}
                onChange={(e) => toggleRedColor(e.target.checked)}
                id="Colorado"
              />
            </div>
            <div className="col-4">
              <h6>Seleccione el sexo</h6>
              <Form.Check
                type="radio"
                label="Macho"
                value="macho"
                name="sex"
                onChange={() => setSex('Macho')}
                defaultChecked
                id="Macho"
              />
              <Form.Check
                type="radio"
                label="Hembra"
                value="hembra"
                name="sex"
                onChange={() => setSex('Hembra')}
                id="Hembra"
              />
              {/*  <Form.Check
                type="radio"
                label="?"
                value="?"
                name="sex"
                defaultChecked
                onChange={() => setSex('?')}
                id="?"
              /> */}
            </div>
            <div className="col-4">
              <h6>Seleccione el tamaño</h6>
              <Form.Check
                type="radio"
                label="Pequeño"
                value="Pequeño"
                name="size"
                onChange={() => setSize('Pequeño')}
                id="Pequeño"
              />
              <Form.Check
                type="radio"
                label="Mediano"
                value="Mediano"
                name="size"
                defaultChecked
                onChange={() => setSize('Mediano')}
                id="Mediano"
              />
              <Form.Check
                type="radio"
                label="Grande"
                value="Grande"
                name="size"
                onChange={() => setSize('Grande')}
                id="Grande"
              />
            </div>
          </div>
        </Form.Group>
        <MapAllDogs
          black={blackColor}
          white={whiteColor}
          red={redColor}
          blonde={blondeColor}
          brown={brownColor}
          sex={sex}
          size={size}
        />
      </div>
      <Footer />
    </div>
  );
}

export default DogFiltering;
