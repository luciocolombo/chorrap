import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function UserBar({ uploadDog, seeAllDogs }) {
  let history = useHistory();

  function onClick() {
    localStorage.clear();
    document.cookie = `user=${localStorage.getItem(
      'user'
    )}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    history.push('/login');
  }
  function goAllDogs() {
    history.push('/all');
  }
  function goNewDog() {
    history.push('/reportar');
  }
  function goReported() {
    history.push('/reported');
  }
  return (
    <div className="d-flex justify-content-between mt-3">
      <div>
        <p className="text-right align-middle ">
          <Button
            data-toggle="tooltip"
            data-placement="right"
            title="Log off"
            className=" bhover"
            variant="btn btn-danger"
            onClick={onClick}
          >
            <i class="fa fa-power-off" aria-hidden="true"></i>
          </Button>
          <span className="badge badge-light ml-3 ">
            {localStorage.getItem('user')
              ? localStorage.getItem('user')
              : 'n/a'}
          </span>
        </p>
      </div>
      <div className="container">
        <Button
          className="bg-white bhover"
          variant="outline-secondary"
          onClick={goAllDogs}
        >
          Buscar perro perdido
        </Button>

        <Button
          className="bg-white bhover"
          variant="outline-secondary"
          onClick={goNewDog}
        >
          Reportar perro
        </Button>

        <Button
          className="bg-white bhover"
          variant="outline-secondary"
          onClick={goReported}
        >
          Mis perros reportados
        </Button>
      </div>
    </div>
  );
}

export default UserBar;
