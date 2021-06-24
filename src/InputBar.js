import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Alert, Spinner } from 'react-bootstrap';
import Map from './Map';
import axios from './services/api';
import Footer from './Footer';

import { useHistory } from 'react-router-dom';
import UserBar from './UserBar';
function InputBar() {
  let history = useHistory();
  const [position, setPosition] = useState('');
  const [email, changeEmail] = useState(localStorage.getItem('user'));
  const [blackColor, toggleBlackColor] = useState(false);
  const [whiteColor, toggleWhiteColor] = useState(false);
  const [brownColor, toggleBrownColor] = useState(false);
  const [blondeColor, toggleBlondeColor] = useState(false);
  const [redColor, toggleRedColor] = useState(false);
  const [estado, setEstado] = useState('');
  const [sex, setSex] = useState('?');
  const [size, setSize] = useState('Mediano');
  const [dogState, setDogState] = useState({});
  const [firstRender, setFirstRender] = useState(true);
  const [show, setShow] = useState(false);
  const [waiting, setWaiting] = useState(false);

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

  async function sendToDb() {
    if (
      (position !== '') &
      (email !== '') &
      (file !== {}) &
      (estado !== '') &
      (blackColor !== false ||
        whiteColor !== false ||
        brownColor !== false ||
        blondeColor !== false ||
        redColor !== false)
    ) {
      setWaiting(true);
      let fileVar = file;
      let formData = new FormData();
      formData.append('image', fileVar);

      /*  const instance = axios.create({
        withCredentials: true,
      });
      const url = await instance
        .post(
          `https://mascotasperdidasapi.herokuapp.com/senddogphoto/${JSON.stringify(
            position
          )}` */
      const url = await axios
        .post(
          `/senddogphoto/${JSON.stringify(position)}`,

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
        estado,
        sex,
        size,
      };
      setFirstRender(false);
      setDogState(dog);

      /*       console.log('Google Cloud URL de imagen:', url); */
    } else {
      alert('Todos los campos requeridos deben ser completados');
      handleClose();
      return;
    }
    handleClose();
    history.push('/reported');
  }

  useEffect(() => {
    /* const instance = axios.create({
      withCredentials: true,
    });
    instance */
    if (firstRender) {
    } else {
      axios
        .post('/senddog' /* 'http://localhost:4000/senddog', */, dogState)
        .then((res) => {
          console.log('MongoDB data:', dogState, 'y la res', res);
          setWaiting(false);
        });
    }
  }, [dogState, firstRender]);

  return (
    <div>
      <UserBar uploadDog="disabled" />
      <Alert key="2" variant="warning">
        Creado sin fines de lucro. Ayuda a sostener el sitio online con una
        donación. Mercadopago:colombolucio@hotmail.com
      </Alert>

      <div className="container bg-white border shadow mt-1 p-5 overflow-hidden">
        <h1 className="hh1">Reporta un perro perdido en Rosario</h1>
        <h4 className="hh2">
          Completa los datos para comunicarlo a la comunidad.
        </h4>

        <Form>
          <Form.Group controlId="estado" required>
            <h4 className="hh2">
              Perdiste un perro, lo recogiste o solo lo viste en la calle?
            </h4>
            <div key="default-radio3" className="mb-3">
              <Form.Check
                name="estado"
                value="perdido"
                type="radio"
                id="perdido"
                label="Perdi un perro"
                onClick={() => setEstado('Perdido')}
              />
              <Form.Check
                type="radio"
                name="estado"
                id="encontrado"
                value="encontrado"
                label="
                Recogí un perro de la calle"
                onClick={() => setEstado('Recogido')}
              />
              <Form.Check
                name="estado"
                type="radio"
                id="avistado"
                label="Avisté un perro en la calle (no lo recogí)"
                value="avistado"
                onClick={() => setEstado('Avistado en la calle')}
              />
            </div>
          </Form.Group>
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

          <Form.Group controlId="sexo">
            <h4 className="hh2">Ingrese el sexo si lo conoce</h4>
            <div key="default-radio" className="mb-3">
              <Form.Check
                name="sex"
                value="macho"
                type="radio"
                id="macho"
                label="Macho"
                onClick={() => setSex('Macho')}
              />
              <Form.Check
                type="radio"
                name="sex"
                id="hembra"
                value="hembra"
                label="
                Hembra"
                onClick={() => setSex('Hembra')}
              />
              <Form.Check
                name="sex"
                type="radio"
                id="?"
                label="?"
                value="?"
                onClick={() => setSex('?')}
              />
            </div>
          </Form.Group>

          <Form.Group controlId="tamaño">
            <h4 className="hh2">Ingrese el tamaño</h4>
            <div key="default-radio2" className="mb-3">
              <Form.Check
                name="tamaño"
                value="pequeño"
                type="radio"
                id="pequeño"
                label="Pequeño"
                onClick={() => setSize('Pequeño')}
              />
              <Form.Check
                type="radio"
                name="tamaño"
                id="mediano"
                value="mediano"
                label="
                Mediano"
                onClick={() => setSize('Mediano')}
              />
              <Form.Check
                name="tamaño"
                type="radio"
                id="grande"
                label="Grande"
                value="grande"
                onClick={() => setSize('Grande')}
              />
            </div>
          </Form.Group>
          <Form.Group>
            <h4 className="hh2">Subir imagen del perro</h4>
            <input
              type="file"
              name="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => handleFile(e)}
            />
          </Form.Group>
          <h4 className="my-4 hh2">
            Ubique la ubicación de perro arrastrando el marcador en el mapa
          </h4>
          <div className="overflow-hidden">
            <Map setPosition={setPosition} />
          </div>
          <Button className="my-5 w-100" onClick={handleShow}>
            Reportar perro
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Enviando perro...</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p> Reportar perro</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="primary" type="submit" onClick={sendToDb}>
                Reportar perro
              </Button>
            </Modal.Footer>
            {waiting ? (
              <div className="p-3">
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            ) : (
              ''
            )}
          </Modal>
        </Form>
      </div>
      <Footer />
    </div>
  );
}

export default InputBar;
