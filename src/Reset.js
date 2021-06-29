import { React, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from './services/api';

function Reset() {
  const pathname = window.location.pathname.substring(
    //the pathname IS the USERID
    7,
    window.location.pathname.length
  );
  const [password, setPassword] = useState('');
  async function onClick() {
    await axios
      .post(
        `/reset/${pathname}` /* , { pathname: pathname, password: password } */
      )
      .then(() => alert('Password actualizado'));
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
