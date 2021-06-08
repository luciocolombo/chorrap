import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import Map from './Map';
import axios from 'axios';
import Footer from './Footer';

import { useHistory } from 'react-router-dom';
import UserBar from './UserBar';
function InputBar() {
  let history = useHistory();
  const [position, setPosition] = useState('');
  const [email, changeEmail] = useState('');
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
  useEffect(goLogin, [history]); //aca agregue history por warning de react

  function handleFile(e) {
    console.log(e);
    if (
      (e.target.files &&
        e.target.files[0].size < 5 * 1024 * 1024 &&
        e.target.files[0].type === 'image/jpeg') ||
      e.target.files[0].type === 'image/png' ||
      e.target.files[0].type === 'image/jpg'
    ) {
      setFile(e.target.files[0]);
    } else {
      alert(
        'El tamaño de imagen máximo admisible es 1MB y en formatos JPG y PNG'
      );
    }
  }

  const [dogState, setDogState] = useState({});

  async function sendToDb() {
    if (
      (position !== '') &
      (email !== '') &
      (file !== {}) &
      (blackColor !== false ||
        whiteColor !== false ||
        brownColor !== false ||
        blondeColor !== false ||
        redColor !== false)
    ) {
      let fileVar = file;
      let formData = new FormData();
      formData.append('image', fileVar);

      const instance = axios.create({
        withCredentials: true,
      });
      const url = await instance
        .post(
          `https://mascotasperdidasapi.herokuapp.com/${JSON.stringify(
            position
          )}`,
          formData
        )
        .then((res) =>
          res.status === 404 //NO ANDA. Y CAMBIAR 404 POR OTRO
            ? console.log('No puede reportar mas de 30 perros')
            : res.data.url
        );
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
      /*       console.log('Google Cloud URL de imagen:', url); */
    } else {
      alert('Todos los campos requeridos deben ser completados');
    }
    handleClose();
  }

  useEffect(() => {
    const instance = axios.create({
      withCredentials: true,
    });
    instance
      .post('https://mascotasperdidasapi.herokuapp.com/senddog', dogState)
      .then((res) => {
        console.log('MongoDB data:', dogState, 'y la res', res);
      });
  }, [dogState]);

  return (
    <div>
      <UserBar uploadDog="disabled" />
      <Alert key="2" variant="warning">
        Creado sin fines de lucro. Ayuda a sostener el sitio online con una
        donación. Mercadopago:colombolucio@hotmail.com
      </Alert>

      <div className="container bg-white border shadow mt-2 p-5 overflow-hidden">
        <h1 className="hh1">Encontraste un perro perdido en Rosario?</h1>
        <h4 className="hh2">
          Completa los datos para comunicarlo a la comunidad. No olvides marcar
          la posición en el mapa
        </h4>

        <Form>
          {/* ME FALTA AGREGAR SEXO Y NOMBRE */}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email de contacto</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese email"
              value={email}
              onChange={(e) => changeEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="colornegro">
            <h4 className="hh2">Seleccione los colores del perro</h4>

            <Form.Check
              type="checkbox"
              label="Negro"
              value={blackColor}
              onChange={(e) => toggleBlackColor(e.target.checked)}
            />
          </Form.Group>
          <Form.Group controlId="colorblanco">
            <Form.Check
              type="checkbox"
              label="Blanco"
              value={whiteColor}
              onChange={(e) => toggleWhiteColor(e.target.checked)}
            />
          </Form.Group>
          <Form.Group controlId="colormarron">
            <Form.Check
              type="checkbox"
              label="Marron"
              value={brownColor}
              onChange={(e) => toggleBrownColor(e.target.checked)}
            />
          </Form.Group>
          <Form.Group controlId="colorrubio">
            <Form.Check
              type="checkbox"
              label="Rubio"
              value={blondeColor}
              onChange={(e) => toggleBlondeColor(e.target.checked)}
            />
          </Form.Group>
          <Form.Group controlId="colorcolorado">
            <Form.Check
              type="checkbox"
              label="Colorado"
              value={redColor}
              onChange={(e) => toggleRedColor(e.target.checked)}
            />
          </Form.Group>

          {/* Agregar fecha */}
          <Form.Group>
            <h4 className="hh2">Subir imagen del perro</h4>
            <input
              type="file"
              name="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => handleFile(e)}
            />
          </Form.Group>
          <h4 className="my-4 hh2">Ubique la ubicación de perro encontrado</h4>
          <div className="overflow-hidden">
            <Map setPosition={setPosition} />
          </div>
          <Button className="my-5 w-100" onClick={handleShow}>
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
        </Form>
      </div>
      <Footer />
    </div>
  );
}

export default InputBar;
