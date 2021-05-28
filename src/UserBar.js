import React from 'react'
import {Button} from 'react-bootstrap'
import { useHistory } from "react-router-dom"

function UserBar({uploadDog, seeAllDogs}) {
    let history = useHistory();

    function onClick(){
        localStorage.clear();
        document.cookie = `user=${localStorage.getItem("user")}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        history.push('/login')
    }
    function goAllDogs(){
        history.push('/all')
    }
    function goNewDog(){
        history.push('/')
    }
    function goReported(){
        history.push('/reported')
    }
    return (
        <div className="d-flex justify-content-between mt-3">
            <div>
            <p className="text-right align-middle mt-2">Logged as <span className="badge badge-light">{localStorage.getItem("user")?localStorage.getItem("user"):"n/a"}</span></p>
            </div>
            <div>
            <Button className="bg-white bhover" variant="outline-secondary" onClick={onClick}>Log off</Button>
            {seeAllDogs!=="disabled"?
            <Button className="bg-white bhover" variant="outline-secondary"onClick={goAllDogs}>See all dogs</Button>
            :''}
            {uploadDog!=="disabled"?
            <Button className="bg-white bhover" variant="outline-secondary" onClick={goNewDog}>Upload new missing dog</Button>
            :''}
            <Button className="bg-white bhover" variant="outline-secondary" onClick={goReported}>Mis perros reportados</Button>
            </div>
            
        </div>
    )
}

export default UserBar
