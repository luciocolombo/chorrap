import { React, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from './services/api';
import { useHistory } from 'react-router-dom';

function Reset() {
  let history = useHistory();
  const resetToken = window.location.pathname.split('/')[3];
  const userid = window.location.pathname.split('/')[2];
  const [password, setPassword] = useState('');
  async function onClick() {
    await axios
      .post(`/reset/${userid}/${resetToken}`, { password })
      .then((res) => {
        alert(res.data);
        history.push('/reportar');
      });
  }
  return (
    <div className="loginfather shadow">
      <Container className="loginregister background login container border shadow bg-white">
        <Form.Group controlId="formBasicPassword">
          <h2>Setea el nuevo password</h2>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="btn btn-primary loginbtn mr-2"
          type="submit"
          onClick={onClick}
        >
          Cambiar password
        </Button>
      </Container>
    </div>
  );
}

export default Reset;
