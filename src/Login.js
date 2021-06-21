import { React, useState } from 'react';
import { Button, Form, Container, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Footer from './Footer';
import axios from './services/api';

function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [waiting, setWaiting] = useState(false);
  let history = useHistory();

  async function onClick(e) {
    setWaiting(true)
    e.preventDefault();
    if (email !== '' && password !== '') {
     await  axios
        .post('/login', {
          email: email,
          password: password,
        })
        .then((res) =>
          res.data.logged === 'incorrect login'
            ? alert('Acceso incorrecto')
            : loginNow(res)
        );
        setWaiting(false)
    } else {
      alert('Ingrese usuario y contraseña');
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
    <div>
      <Container className="loginregister background login container border shadow bg-white">
        <Form>
          <h2>Login</h2>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
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
            <Button
              variant="btn btn-primary loginbtn mr-2"
              type="submit"
              onClick={onClick}
            >
              Login
            </Button>
            <Button variant="outline-secondary " onClick={goRegister}>
              Register instead
            </Button>
            {waiting?
            <div className="p-3"><Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
            </div>:''}
          </div>
        </Form>
      </Container>
      <Footer />
    </div>
  );
}

export default Login;
