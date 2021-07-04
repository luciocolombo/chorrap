import { React, useState, useEffect } from 'react';
import { Button, Form, Container, Spinner, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Footer from './Footer';
import axios from './services/api';
import Forgot from './Forgot';

function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /*  const [twoFA, setTwoFA] = useState(false); */
  const [otp, setOtp] = useState(0);
  let history = useHistory();
  async function loginWithTwoFA() {
    try {
      await axios.post('/login2fa', { otp, email }).then((res) => {
        if (!res.data.token) {
          alert('Acceso incorrecto');
        } else {
          window.localStorage.setItem('jwt', res.data.token);

          loginNow(res);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  /*  useEffect(() => {
    alert(
      'Este sitio está en su versión Beta (Versión de prueba). En caso de encontrar sugerencias, por favor contactarse con colombolucio@hotmail.com. Gracias'
    );
  }, []); */
  async function onClick(e) {
    setWaiting(true);
    e.preventDefault();
    if (email !== '' && password !== '') {
      try {
        await axios
          .post('/login', {
            email: email,
            password: password,
          })
          .then((res) => {
            if (res.data.twofa) {
              /* setTwoFA(true); */
              handleShow();
            } else {
              if (!res.data.token) {
                alert('Acceso incorrecto');
              } else {
                window.localStorage.setItem('jwt', res.data.token);

                loginNow(res);
              }
            }
          });
        setWaiting(false);
      } catch (error) {
        alert('Acceso incorrecto');
        console.log(error);
      }
    } else {
      alert('Ingrese usuario y contraseña');
      setWaiting(false);
    }
  }

  function loginNow(res) {
    localStorage.setItem('state', 'logged');
    localStorage.setItem('user', email);
    localStorage.setItem('userid', res.data.userId);
    history.push('/reportar');
    /*   console.log(res); */
  }

  function goRegister() {
    history.push('/register');
  }
  return (
    <div className="loginfather shadow row ">
      <div className="col-md-7 halfloginregisterdiv">
        <Container className="loginregister background login container border shadow bg-white">
          <Form>
            <h2>
              <i className="fas fa-sign-in-alt"></i>Ingresar
            </h2>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>
                <i className="fas fa-envelope-open-text"></i>Email
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>
                <i className="fas fa-key"></i>Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div className="navbarra d-flex">
              <div>
                <Button
                  variant="btn btn-primary loginbtn mr-2"
                  type="submit"
                  onClick={onClick}
                >
                  <i className="fas fa-sign-in-alt"></i>Ingresar
                </Button>
                <Button variant="outline-secondary " onClick={goRegister}>
                  <i className="fas fa-user-plus"></i>Registrarse
                </Button>
              </div>
              <div>
                <Forgot />
              </div>
              {waiting ? (
                <div className="p-3">
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Cargando...</span>
                  </Spinner>
                </div>
              ) : (
                ''
              )}
            </div>
          </Form>
          <>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Autenticación de dos pasos</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Ingrese el código que fue enviado a su correo
              </Modal.Body>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="text"
                  placeholder="Password de uso unico recibido en el correo"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button variant="primary" onClick={loginWithTwoFA}>
                  Aceptar
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </Container>
        <Footer />
      </div>
      <div className="col-5 h-100 loginimgdiv"></div>
    </div>
  );
}

export default Login;
