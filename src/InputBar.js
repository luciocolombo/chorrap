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
  const [commentary, changeCommentary] = useState('');
  const [catdog, setCatDog] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [file, setFile] = useState({});
  /*   useEffect(
    () =>
      alert(
        'El sitio se encuentra en mantenimiento. Es posible que encuentre algunos inconvenientes hasta que terminemos con las tareas. Gracias'
      ),
    []
  ); */
  function goLogin() {
    localStorage.getItem('state') !== 'logged'
      ? history.push('/login')
      : console.log('');
  }
  useEffect(goLogin, [history]); //aca agregue history por warning de react
  useEffect(() => {
    if (catdog === 'gato') {
      setSize('Pequeño');
    }
  }, [catdog]);
  function handleFile(e) {
    if (e.target.files[0] !== undefined) {
      if (
        (e.target.files[0].size < 5 * 1024 * 1024 &&
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
  }

  async function sendToDb() {
    if (
      position &&
      email &&
      file.name &&
      estado &&
      (blackColor || whiteColor || brownColor || blondeColor || redColor)
    ) {
      setWaiting(true);
      let fileVar = file;
      let formData = new FormData();
      formData.append('image', fileVar);

      let url = '';
      try {
        url = await axios
          .post(
            `/senddogphoto/${JSON.stringify(position)}`,

            formData
          )
          .then((res) => res.data.url);
      } catch (error) {
        console.log(error);
        alert('No puede reportar mas de 30 mascotas');
      }
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
        commentary,
        catdog,
      };
      setFirstRender(false);
      setDogState(dog);
    } else {
      alert('Todos los campos requeridos deben ser completados');
      handleClose();
      return;
    }
    handleClose();
    history.push('/reported');
  }

  useEffect(() => {
    if (firstRender) {
    } else {
      axios.post('/senddog', dogState).then((res) => {
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
        <h1 className="hh1">
          <i className="fas fa-search-location"></i>
          Reporta una mascota perdida en Rosario
          <i className="fas fa-search-location"></i>
        </h1>
        <h4 className="hh2 text-center">
          <span className="badge badge-info headerbadge">
            Completa los datos para comunicarlo a la comunidad!
          </span>
        </h4>

        <Form>
          <Form.Group controlId="estado" required>
            <h4 className="hh2">
              <i class="fas fa-paw"></i>
              Perdiste una mascota, la recogiste o solo la viste en la calle?{' '}
            </h4>
            <div key="default-radio3" className="mb-3">
              <Form.Check
                name="estado"
                value="perdid"
                type="radio"
                id="perdido"
                label="Perdi una mascota"
                onClick={() => setEstado('Perdido')}
              />
              <Form.Check
                type="radio"
                name="estado"
                id="encontrado"
                value="encontrado"
                label="
                Recogí una mascota de la calle"
                onClick={() => setEstado('Recogido')}
              />
              <Form.Check
                name="estado"
                type="radio"
                id="avistado"
                label="Avisté una mascota en la calle (no lo recogí)"
                value="avistado"
                onClick={() => setEstado('Avistado en la calle')}
              />
            </div>
          </Form.Group>

          <Form.Group controlId="catdog">
            <h4 className="hh2">
              <i class="fas fa-cat"></i>
              Perro o gato?
            </h4>
            <div key="default-radio2" className="mb-3">
              <Form.Check
                name="dog"
                value="catdog"
                type="radio"
                id="gato"
                label="Gato"
                onClick={() => setCatDog('gato')}
              />
              <Form.Check
                name="dog"
                value="dog"
                type="radio"
                id="perro"
                label="Perro"
                onClick={() => setCatDog('perro')}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-0" controlId="colornegro">
            <h4 className="hh2">
              <i className="fas fa-palette"></i>Seleccione los colores
            </h4>

            <Form.Check
              type="checkbox"
              label="Negro"
              value={blackColor}
              onChange={(e) => toggleBlackColor(e.target.checked)}
            />
          </Form.Group>
          <Form.Group className="mb-0" controlId="colorblanco">
            <Form.Check
              type="checkbox"
              label="Blanco"
              value={whiteColor}
              onChange={(e) => toggleWhiteColor(e.target.checked)}
            />
          </Form.Group>
          <Form.Group className="mb-0" controlId="colormarron">
            <Form.Check
              type="checkbox"
              label="Marron"
              value={brownColor}
              onChange={(e) => toggleBrownColor(e.target.checked)}
            />
          </Form.Group>
          <Form.Group className="mb-0" controlId="colorrubio">
            <Form.Check
              type="checkbox"
              label="Rubio"
              value={blondeColor}
              onChange={(e) => toggleBlondeColor(e.target.checked)}
            />
          </Form.Group>
          <Form.Group className="mb-0" controlId="colorcolorado">
            <Form.Check
              type="checkbox"
              label="Colorado"
              value={redColor}
              onChange={(e) => toggleRedColor(e.target.checked)}
            />
          </Form.Group>

          <Form.Group controlId="sexo">
            <h4 className="hh2">
              <i className="fas fa-venus-mars"></i>Ingrese el sexo si lo conoce
            </h4>
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
            <h4 className="hh2">
              <i className="fas fa-ruler"></i>Ingrese el tamaño
            </h4>
            <div key="default-radio2" className="mb-3">
              <Form.Check
                name="tamaño"
                value="pequeño"
                type="radio"
                id="pequeño"
                label="Pequeño"
                disabled={catdog === 'gato' ? true : false}
                onClick={() => setSize('Pequeño')}
              />
              <Form.Check
                type="radio"
                name="tamaño"
                id="mediano"
                value="mediano"
                label="
                Mediano"
                disabled={catdog === 'gato' ? true : false}
                onClick={() => setSize('Mediano')}
              />
              <Form.Check
                name="tamaño"
                type="radio"
                id="grande"
                label="Grande"
                value="grande"
                disabled={catdog === 'gato' ? true : false}
                onClick={() => setSize('Grande')}
              />
            </div>
          </Form.Group>
          <Form.Group>
            <h4 className="hh2">
              <i className="fas fa-camera-retro"></i>Subir imagen
            </h4>
            <input
              className="btn btn-info inputfile"
              type="file"
              name="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => handleFile(e)}
            />
            <Form.Group className="my-3" controlId="formBasicEmail">
              <Form.Label>
                Email de contacto (Visible en tus publicaciones)
              </Form.Label>
              <Form.Control
                className="w-25 emailinput"
                type="email"
                placeholder="Ingrese email "
                value={email}
                onChange={(e) => changeEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="my-3" controlId="formBasicCommentary">
              <Form.Label>
                Número de celular, Whatsapp, información extra, etc
              </Form.Label>
              <Form.Control
                className="w-110"
                type="text"
                maxLength="100"
                placeholder="Teléfono de contacto, información extra, etc"
                value={commentary}
                onChange={(e) => changeCommentary(e.target.value)}
              />
            </Form.Group>
          </Form.Group>
          <h4 className="my-4 hh2">
            <i className="fas fa-map-marked-alt"></i>Ubique la ubicación de la
            mascota arrastrando el marcador en el mapa
          </h4>
          <div className="overflow-hidden">
            <Map setPosition={setPosition} />
          </div>
          <Button className="mt-5 w-100" onClick={handleShow}>
            Reportar mascota perdida
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Enviando perro...</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p className="text-center">
                {' '}
                Asegurate que toda la información proporcionada es correcta{' '}
                <br></br> y que los demas usuarios puedan contactarse a tu{' '}
                <strong>email o celular</strong> si lo proporcionaste
              </p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="primary" type="submit" onClick={sendToDb}>
                Reportar mascota
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
