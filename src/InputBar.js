import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import Map from './Map'

function InputBar() {
    const [draggableVisibility, toggleDraggableVisibility]=useState(false)
    return (
        <div>
            <h1 className="hh1">Encontraste un perro perdido en Rosario?</h1>
            <h2>Completa los datos para comunicarlo a la comunidad. No olvides marcar la posición en el mapa</h2>
            
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email de contacto</Form.Label>
                    <Form.Control type="email" placeholder="Ingrese email" />
                    <Form.Label>Conoces la raza del perro?</Form.Label>
                    <Form.Control type="String" placeholder="Introduzca raza si la conoce" />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox">
                    <h2>Seleccione hasta 3 colores de perro</h2>
                    <Form.Check type="checkbox" label="Blanco" />
                    <Form.Check type="checkbox" label="Negro" />
                    <Form.Check type="checkbox" label="Marron" />
                    <Form.Check type="checkbox" label="Rubio" />
                    <Form.Check type="checkbox" label="Colorado" />
                </Form.Group>

                <Form.Group>
                    <h2>Subir imagen del perro</h2>
                    <Form.File id="exampleFormControlFile1" label="Example file input" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <Map showDraggable={draggableVisibility}/>
            <Button className="btn btn-info ml-3 mb-1" onClick={()=>{toggleDraggableVisibility(!draggableVisibility)}}>Toggle draggable marker visibility (and show all lost dogs)</Button>
        </div>
        
    )
}

export default InputBar
