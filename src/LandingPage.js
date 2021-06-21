import React from 'react';
import Navbarr from './Navbarr';
import { useHistory } from 'react-router-dom';
import pc from '../src/2_macbookair13_front.png';
function LandingPage() {
  let history = useHistory();
  localStorage.getItem('state') === 'logged'
    ? history.push('/reportar')
    : console.log('');

  return (
    <div className="landingpage row ">
      <div className="col">
        <img className="pc" src={pc}></img>
      </div>
      <div className=" col d-flex flex-column margintop">
        <h1 className="text-center">Encuentra tu mascota perdida en Rosario</h1>
        <h2 className="text-center">Tu mascota te espera!</h2>
        <Navbarr />
      </div>
    </div>
  );
}

export default LandingPage;
