import {React, useState} from 'react'
import {Button, Form, Container} from 'react-bootstrap'
import axios from "axios"

function Register() {
    const [password, setPassword]=useState("");
    const [email, setEmail]=useState("");
    function onClick(e){
       e.preventDefault()
       axios.post('http://localhost:4000/register',{email:email,password:password})
       .then((res)=>{
          console.log(res.data.message.includes('E11000 duplicate key'))
    })
    }
    return (
        <div>
            <Container className="mt-5">
            <Form >
                <h2>Register</h2>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                   
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={onClick} >
                    Register
                </Button>
            </Form>
            </Container>

        </div>
    )
}
export default Register
