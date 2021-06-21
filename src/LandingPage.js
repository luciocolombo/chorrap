import React from 'react';
import Navbarr from './Navbarr';
import { useHistory } from 'react-router-dom';

function LandingPage() {
  let history = useHistory();
  localStorage.getItem('state') === 'logged'
    ? history.push('/reportar')
    : console.log('');

  return (
    <div className="landingpage  ">
      <div className="  d-flex flex-column margintop">
        <h1 className="text-center">Encuentra tu mascota perdida en Rosario</h1>
        <h2 className="text-center">Tu mascota te espera!</h2>
        <Navbarr />
      </div>
    </div>
  );
}

export default LandingPage;
