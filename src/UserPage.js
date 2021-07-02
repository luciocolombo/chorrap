import { React, useState } from 'react';
import UserBar from './UserBar';
import { Button, Modal } from 'react-bootstrap';
import axios from './services/api';
function UserPage() {
  const [pass, changePass] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };
  async function sendChangePass() {
    try {
      const userid = localStorage.getItem('userid');
      await axios.post('/changepass', { pass, userid }).then((res) => {
        handleClose();
        alert('Exito');
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <UserBar />
      <div className="container bg-white shadow border col-4 mt-5 p-4 pt-5">
        <form>
          <div className="form-group">
            <h5>Actualizar contraseña</h5>
            <small className="text-muted">
              Elija una contraseña segura de mínimo 6 caracteres.
            </small>

            <div className="d-flex">
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(e) => changePass(e.target.value)}
              />
              <button className="btn btn-primary " onClick={handleShow}>
                Cambiar
              </button>
            </div>
          </div>

          <div className="form-group mt-5">
            <h5>Activar autenticación de dos pasos (2FA)</h5>
            <small className="text-muted">
              Se enviará un correo con un codigo de 6 digitos, el cual será
              requerido para iniciar sesión
            </small>

            <button className="btn btn-success w-100 mt-2" onClick={'#'}>
              Activar autenticación en dos pasos
            </button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Cambiar password?</Modal.Title>
              </Modal.Header>
              <Modal.Body>No olvides tu password y no lo compartas</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button variant="primary" onClick={sendChangePass}>
                  Aceptar
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserPage;
