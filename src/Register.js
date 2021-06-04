import { React, useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Register() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  let history = useHistory();

  function Register() {
    alert('Usuario creado');
    localStorage.setItem('state', 'logged');
    history.push('/reportar');
  }
  function onClick(e) {
    e.preventDefault();
    if (email !== '' && (password !== '') & (password.length > 5)) {
      axios
        .post('http://localhost:4000/register', {
          email: email,
          password: password,
        })
        .then((res) => {
          res.data.message && res.data.message.includes('E11000 duplicate key')
            ? alert('Ya registrado')
            : Register();
        });
    }
    if (password.length < 5) {
      alert('Su password debe tener al menos 5 caracteres');
    }
  }
  function goLogin() {
    history.push('/login');
  }
  return (
    <div>
      <Container className="loginregister background login container col-3 border shadow bg-white">
        <Form onSubmit={(e) => onClick(e)}>
          <h2>Register</h2>
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
            <Button variant="btn btn-primary loginbtn mr-2" type="submit">
              Register
            </Button>

            <Button variant="outline-secondary " onClick={goLogin}>
              Login instead
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}
export default Register;
