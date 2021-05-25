import {React, useState} from 'react'
import {Button, Form, Container} from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from "react-router-dom"

function Login() {
    const [password, setPassword]=useState("");
    const [email, setEmail]=useState("");
    /* const [access, setAccess]=useState(false); */
    let history = useHistory();

    function onClick(e){
       e.preventDefault()
        axios.post('http://localhost:4000/login',{email:email,password:password})
        .then((res)=>res.data.logged==="yes"?loginNow(res):alert("acceso incorrecto"))
    }

    function loginNow(res){
        localStorage.setItem("state", "logged");
        console.log(res)
        history.push("/")
        //aca mandar a la ventana principal
    }
    return (
        <div>
            <Container className="mt-5">
            <Form>
                <h2>Login</h2>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />                  
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
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
