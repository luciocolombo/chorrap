import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import Map from './Map';
import axios from 'axios';

import { useHistory } from 'react-router-dom';
import UserBar from './UserBar';
function InputBar() {
  let history = useHistory();
  const [position, setPosition] = useState('');
  const [email, changeEmail] = useState('');
  /* const [raza, changeRaza]=useState(""); */
  const [blackColor, toggleBlackColor] = useState(false);
  const [whiteColor, toggleWhiteColor] = useState(false);
  const [brownColor, toggleBrownColor] = useState(false);
  const [blondeColor, toggleBlondeColor] = useState(false);
  const [redColor, toggleRedColor] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [file, setFile] = useState({});

  function goLogin() {
    localStorage.getItem('state') !== 'logged'
      ? history.push('/login')
      : console.log('');
  }
  useEffect(goLogin, []);

  function handleFile(e) {
    setFile(e.target.files[0]);
    /* console.log("EL FILE ES",file) */
  }

  const [dogState, setDogState] = useState({});

  async function sendToDb() {
    if ((position !== '') & (email !== '') & (file !== {})) {
      let fileVar = file;
      let formData = new FormData();
      formData.append('image', fileVar);

      const url = await axios
        .post('http://localhost:4000/senddogphoto', formData)
        .then((res) => res.data.url);
      let userid = localStorage.getItem('userid');
      let dog = {
        userid,
        position,
        email,
        blackColor,
        whiteColor,
        brownColor,
        blondeColor,
        redColor,
        url,
      };
      setDogState(dog);
      console.log('Google Cloud URL de imagen:', url);
    } else {
      alert(
        'Todos los campos requeridos deben ser completados' +
          JSON.stringify({
            position,
            email /* ,raza */,
            blackColor,
            whiteColor,
            brownColor,
            blondeColor,
            redColor,
          })
      );
    }
    handleClose();
  }

  useEffect(() => {
    axios.post('http://localhost:4000/senddog', dogState).then((res) => {
      console.log('MongoDB data:', dogState, 'y la res', res);
    });
  }, [dogState]);

  /*  const [draggableVisibility, toggleDraggableVisibility]=useState(false) */
  return (
    <div>
      <UserBar uploadDog="disabled" />
      <div className="container bg-white border shadow mt-2 p-5 overflow-hidden">
        <h1 className="hh1">Encontraste un perro perdido en Rosario?</h1>
        <h2>
          Completa los datos para comunicarlo a la comunidad. No olvides marcar
          la posición en el mapa
        </h2>

        <Form>
          {/* ME FALTA AGREGAR SEXO Y NOMBRE */}
          <Form.Group controlId="formBasicEmailRaza">
            <Form.Label>Email de contacto</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese email"
              value={email}
              onChange={(e) => changeEmail(e.target.value)}
            />
            {/*  <Form.Label>Conoces la raza del perro?</Form.Label>
                    <Form.Control type="String" placeholder="Introduzca raza si la conoce" value={raza} onChange={(e)=>changeRaza(e.target.value)}/> */}
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox">
            <h2>Seleccione hasta 3 colores de perro</h2>
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

          {/* Agregar fecha */}
          <Form.Group>
            <h2>Subir imagen del perro</h2>
            {/*  <Form.File id="file" name="file" label="Imagen de perrito" onChange={(e)=>handleFile(e)}/> */}
            <input type="file" name="file" onChange={(e) => handleFile(e)} />
          </Form.Group>
          <h2 className="my-4">Ubique la ubicación de perro encontrado</h2>
          <Map
            setPosition={setPosition} /* showDraggable={draggableVisibility} */
          />
          <Button className="my-5 w-100" onClick={handleShow}>
            {' '}
            Send to DB
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Sending dog...</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Send dog to DB?</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" onClick={sendToDb}>
                Save to DB
              </Button>
            </Modal.Footer>
          </Modal>
          {/*  <Button className="btn btn-info ml-3 mb-1" onClick={()=>{toggleDraggableVisibility(!draggableVisibility)}}>Toggle draggable marker visibility (and show all lost dogs)</Button> */}
        </Form>
      </div>
    </div>
  );
}

export default InputBar;
