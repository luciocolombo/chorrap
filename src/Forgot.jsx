import { React, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from './services/api';

function Forgot() {
  const [email, setEmail] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  async function forgotPassword() {
    if (email) {
      handleClose();
      await axios
        .post('/forgot', { email })
        .then(() => alert('Verifique su casilla de correo'));
    } else alert('Inserte email');
  }
  return (
    <div>
      <Button variant="outline-info" onClick={handleShow}>
        <i className="fas fa-question-circle"></i> Olvidaste la contraseña?
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Recuperemos el acceso!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Si el email está registrado, recibirás un email para reestablecer
          contraseña
        </Modal.Body>

        <Form.Group className="d-flex" controlId="formBasicEmail">
          <Form.Label className="mr-3 mt-2"> Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              forgotPassword();
            }}
          >
            Enviar email
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Forgot;
