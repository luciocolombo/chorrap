import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';

function Navbarr() {
  return (
    <div className="d-flex my-4 navbarra">
      <Link to="/login" className="d-block btn btn-primary mr-3 navbarra">
        <i className="fas fa-dog"></i> Reporta mascotas
      </Link>
      <Link to="/login" className="d-block btn  btn-primary navbarra">
        <i className="fas fa-paw"></i> Encontá tu mascota
      </Link>
    </div>
  );
}

export default Navbarr;
