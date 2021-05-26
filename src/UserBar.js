import React from 'react'
import {Button} from 'react-bootstrap'
import { useHistory } from "react-router-dom"

function UserBar() {
    let history = useHistory();
    function onClick(){
        localStorage.clear();
        document.cookie = `user=${localStorage.getItem("user")}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        history.push('/login')
    }
    return (
        <div>
            <Button onClick={onClick}>Log off</Button>
            <p className="text-right">Logged as {localStorage.getItem("user")?localStorage.getItem("user"):"n/a"}</p>
        </div>
    )
}

export default UserBar
