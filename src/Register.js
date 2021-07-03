import { React, useState } from 'react';
import { Button, Form, Container, Spinner } from 'react-bootstrap';
import axios from './services/api';
import { useHistory } from 'react-router-dom';
import Footer from './Footer';
function Register() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [waiting, setWaiting] = useState(false);
  let history = useHistory();

  function Register(res) {
    alert('Usuario creado');
    console.log('LA RES DE REGISTER ES', res);
    setEmail(res.data.email);
    localStorage.setItem('state', 'logged');
    localStorage.setItem('user', email);
    localStorage.setItem('userid', res.data.userId);
    window.localStorage.setItem('jwt', res.data.token);
    history.push('/reportar');
    /*   console.log(res); */
  }

  async function onClick(e) {
    e.preventDefault();
    if (email !== '' && (password !== '') & (password.length >= 5)) {
      setWaiting(true);
      await axios
        .post('/register', {
          email: email,
          password: password,
        })
        .then((res) => {
          res.data.message && res.data.message.includes('E11000 duplicate key')
            ? alert('Ya registrado')
            : Register(res);
        });
      setWaiting(false);
    }
    if (password.length < 5) {
      alert('Su password debe tener al menos 5 caracteres');
    }
  }
  function goLogin() {
    history.push('/login');
  }
  return (
    <div className="loginfather">
      <Container className="loginregister background login container col-3 border shadow bg-white">
        <Form onSubmit={(e) => onClick(e)}>
          <h2>Registrarse</h2>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="navbarra">
            <Button variant="btn btn-primary loginbtn mr-2" type="submit">
              Registrarse
            </Button>

            <Button variant="outline-secondary " onClick={goLogin}>
              Ingresar
            </Button>
            {waiting ? (
              <div className="p-3">
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            ) : (
              ''
            )}
          </div>
        </Form>
      </Container>
      <Footer />
    </div>
  );
}
export default Register;
