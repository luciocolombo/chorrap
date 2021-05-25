import React from 'react'

function UserBar() {
    return (
        <div>
            <p className="text-right">Logged as {localStorage.getItem("user")?localStorage.getItem("user"):"n/a"}</p>
        </div>
    )
}

export default UserBar
