import React from 'react'
import {Button, Form, Container} from 'react-bootstrap'

function Login() {
    function onClick(){
       
    
    }
    return (
        <div>
            <Container className="mt-5">
            <Form>
                <h2>Login</h2>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={onClick}>
                    Login
                </Button>
            </Form>
            </Container>

        </div>
    )
}

export default Login
