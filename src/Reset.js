import { React, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from './services/api';

function Reset() {
  const resetToken = window.location.pathname.split('/')[3];
  const userid = window.location.pathname.split('/')[2];
  const [password, setPassword] = useState('');
  async function onClick() {
    await axios
      .post(`/reset/${userid}/${resetToken}`, { password })
      .then((res) => alert(res.data));
  }
  return (
    <div>
      <Form.Group controlId="formBasicPassword">
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
    </div>
  );
}

export default Reset;
