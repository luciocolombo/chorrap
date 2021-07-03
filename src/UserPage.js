import { React, useState, useEffect } from 'react';
import UserBar from './UserBar';
import { Button, Modal } from 'react-bootstrap';
import axios from './services/api';
function UserPage() {
  const [pass, changePass] = useState('');
  const [show, setShow] = useState(false);

  const [twoFAStatus, setTwoFAStatus] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = (e) => {
    e.preventDefault();
    setShow2(true);
  };
  const userid = localStorage.getItem('userid');
  async function sendChangePass() {
    try {
      await axios.post('/changepass', { pass, userid }).then((res) => {
        handleClose();
        alert('Exito');
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function toggle2FA() {
    try {
      await axios
        .post('./twofaset', { userid })
        .then(() => setTwoFAStatus(!twoFAStatus));
      handleClose2();
    } catch (error) {
      console.log(error);
    }
  }
  async function get2FAStatus() {
    try {
      await axios
        .post('./twofa', { userid })
        .then((res) => setTwoFAStatus(res.data));
      //guardar la info de 2FA en la variable
    } catch (error) {
      console.log('Error al buscar info del estado de 2FA', error);
    }
  }
  useEffect(() => get2FAStatus(), []);

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
            <h5>Activar/Desactivar autenticación de dos pasos (2FA)</h5>
            <small className="text-muted">
              Se enviará un correo con un codigo de 6 digitos, el cual será
              requerido para iniciar sesión
            </small>

            <button
              className="btn btn-success w-100 mt-2"
              onClick={handleShow2}
            >
              {twoFAStatus
                ? 'Desactivar autenticación en dos pasos'
                : 'Activar autenticación en dos pasos'}
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

            <Modal show={show2} onHide={handleClose2}>
              <Modal.Header closeButton>
                <Modal.Title>2fa</Modal.Title>
              </Modal.Header>
              <Modal.Body>2fa</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose2}>
                  Cancelar
                </Button>
                <Button variant="primary" onClick={toggle2FA}>
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
