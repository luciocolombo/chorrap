import React from 'react';
import Navbarr from './Navbarr';
function LandingPage() {
  return (
    <div className="landingpage d-flex flex-column ">
      <div className="row  col d-flex flex-column justify-content-center align-items-center ">
        <h1> Encuentra tu mascota perdida en Rosario</h1>
        <h2>Tu mascota te espera!</h2>
        <Navbarr />
      </div>
    </div>
  );
}

export default LandingPage;
